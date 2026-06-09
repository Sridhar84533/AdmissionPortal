import PDFDocument from 'pdfkit';
import { dbHelper } from './dbHelper.js';

export const processPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { applicationNumber, paymentMethod, amount } = req.body;

    if (!applicationNumber || !paymentMethod) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    const application = await dbHelper.findApplicationByUser(userId);
    if (!application || application.applicationNumber !== applicationNumber) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.paymentStatus === 'Paid') {
      return res.status(400).json({ message: 'Payment already completed for this application' });
    }

    const transactionId = 'TXN' + Math.floor(10000000 + Math.random() * 90000000);
    const paidAt = new Date().toISOString();

    const paymentDetails = {
      transactionId,
      paymentMethod,
      paidAt,
      receiptPath: `/api/payments/receipt/${applicationNumber}`
    };

    const updatedApp = await dbHelper.updateApplication(userId, {
      paymentStatus: 'Paid',
      paymentDetails
    });

    await dbHelper.createNotification(
      userId,
      `Payment of ₹${amount} successful. Transaction ID: ${transactionId}`,
      'success'
    );

    res.json({
      message: 'Payment completed successfully',
      paymentStatus: 'Paid',
      transactionId,
      paymentDetails
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error processing payment' });
  }
};

export const generateReceiptPDF = async (req, res) => {
  try {
    const { appNumber } = req.params;

    const application = await dbHelper.findApplicationByNumber(appNumber);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.paymentStatus !== 'Paid') {
      return res.status(400).json({ message: 'Payment has not been completed yet' });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Receipt_${appNumber}.pdf`);

    doc.pipe(res);

    // Styling
    doc.fillColor('#1e293b')
       .fontSize(22)
       .text('ADMISSION PORTAL RECEIPT', { align: 'center', underline: true })
       .moveDown();

    doc.fontSize(12).fillColor('#64748b')
       .text('Thank you for your application submission. Your payment is successfully processed.', { align: 'center' })
       .moveDown(2);

    // Transaction Box
    doc.fillColor('#f8fafc')
       .rect(50, 150, 500, 180)
       .fill();

    doc.fillColor('#0f172a').fontSize(14)
       .text('Transaction Details', 70, 170, { bold: true });

    doc.fontSize(11).fillColor('#334155')
       .text(`Application Number: ${appNumber}`, 70, 200)
       .text(`Candidate Name:     ${application.personalInfo?.fullName || 'N/A'}`, 70, 220)
       .text(`Programme Stream:   ${application.programmeStream || 'N/A'}`, 70, 240)
       .text(`Transaction ID:     ${application.paymentDetails?.transactionId || 'N/A'}`, 70, 260)
       .text(`Payment Method:     ${application.paymentDetails?.paymentMethod || 'N/A'}`, 70, 280)
       .text(`Payment Date:       ${new Date(application.paymentDetails?.paidAt).toLocaleDateString()}`, 70, 300);

    // Fee Details
    doc.moveDown(4);
    doc.fontSize(14).fillColor('#0f172a').text('Fee Summary', 50, 360, { underline: true });
    
    // Draw table headers
    doc.fontSize(11).text('Description', 50, 390)
       .text('Amount', 450, 390, { align: 'right' });
    
    doc.moveTo(50, 405).lineTo(550, 405).strokeColor('#cbd5e1').stroke();

    // Table rows
    doc.text('Application Fee', 50, 420)
       .text(`INR ${application.feeAmount || 1500}.00`, 450, 420, { align: 'right' });

    doc.moveTo(50, 440).lineTo(550, 440).stroke();

    // Total
    doc.fontSize(12).text('Total Paid', 50, 460, { bold: true })
       .text(`INR ${application.feeAmount || 1500}.00`, 450, 460, { align: 'right', bold: true });

    // Footer
    doc.moveDown(3);
    doc.fontSize(12).fillColor('#10b981').text('Status: PAYMENT SUCCESSFUL', { align: 'center', bold: true });

    doc.moveDown(2);
    doc.fontSize(8).fillColor('#94a3b8').text('This is an electronically generated document. No signature is required.', { align: 'center' });

    doc.end();

  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ message: 'Server error generating PDF receipt' });
  }
};
