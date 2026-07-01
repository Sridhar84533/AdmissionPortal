import { dbHelper } from './dbHelper.js';
import PDFDocument from 'pdfkit';

export const generateOfferLetterPDF = async (req, res) => {
  try {
    const { appNumber } = req.params;

    const application = await dbHelper.findApplicationByNumber(appNumber);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.status !== 'Offer Letter Generated') {
      return res.status(400).json({ message: 'Provisional offer letter has not been generated yet' });
    }

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Offer_Letter_${appNumber}.pdf`);

    doc.pipe(res);

    // Styling & header
    doc.fillColor('#1e293b')
       .fontSize(24)
       .text('PROVISIONAL ADMISSION OFFER LETTER', { align: 'center', underline: true })
       .moveDown();

    doc.fontSize(10).fillColor('#64748b')
       .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' })
       .text(`Application Number: ${appNumber}`, { align: 'right' })
       .moveDown(2);

    // Candidate Details
    doc.fillColor('#0f172a').fontSize(12)
       .text('Dear ' + (application.personalInfo?.fullName || 'Candidate') + ',', { bold: true })
       .moveDown();

    doc.fontSize(11).fillColor('#334155')
       .text(`We are pleased to inform you that you have been provisionally selected for admission to our prestigious ${application.programmeStream || 'selected'} program under the ${application.programmeCategory || 'Postgraduate'} category.`, { align: 'justify' })
       .moveDown();

    doc.text('Your selection is based on your academic credentials and performance in the entrance verification interview. Please review the details of your admission below:', { align: 'justify' })
       .moveDown();

    // Box of Info
    doc.fillColor('#f8fafc')
       .rect(50, 270, 500, 120)
       .fill();

    doc.fillColor('#0f172a').fontSize(11)
       .text(`Full Name:          ${application.personalInfo?.fullName || 'N/A'}`, 70, 285)
       .text(`Program Stream:     ${application.programmeStream || 'N/A'}`, 70, 305)
       .text(`Category:           ${application.programmeCategory || 'N/A'}`, 70, 325)
       .text(`Registration Fee:   INR ${application.feeAmount || 1500}.00 (PAID)`, 70, 345)
       .text(`Admission Status:   PROVISIONALLY APPROVED`, 70, 365);

    // Next steps
    doc.moveDown(5);
    doc.fontSize(12).fillColor('#0f172a').text('Next Steps & Instructions:', 50, 410, { underline: true });
    doc.fontSize(10).fillColor('#334155')
       .text('1. Complete the balance course fee payment as specified in the prospectus.', 50, 430)
       .text('2. Report to the campus for physical document verification along with original certificates.', 50, 450)
       .text('3. Classes are scheduled to commence in the upcoming semester. Detailed calendar will be shared via email.', 50, 470);

    // Signatures
    doc.moveDown(4);
    doc.fontSize(11).fillColor('#0f172a').text('Sincerely,', 50, 520)
       .moveDown(1.5)
       .text('Director of Admissions', 50, 560, { bold: true })
       .text('AdmissionHub University', 50, 575);

    // Footer note
    doc.moveDown(2);
    doc.fontSize(8).fillColor('#94a3b8').text('This is a computer-generated provisional offer letter. No signature is required.', { align: 'center' });

    doc.end();

  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ message: 'Server error generating PDF offer letter' });
  }
};

export const getApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    let application = await dbHelper.findApplicationByUser(userId);

    if (!application) {
      // If none found for some reason, create a new draft application
      const applicationNumber = 'APP' + Math.floor(100000 + Math.random() * 900000);
      application = await dbHelper.createApplication({
        userId,
        applicationNumber,
        programmeCategory: '',
        programmeStream: '',
        status: 'Draft',
        personalInfo: {
          fullName: req.user.name,
          email: req.user.email
        },
        academicInfo: {},
        documents: [],
        paymentStatus: 'Pending'
      });
    }

    res.json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving application details' });
  }
};

export const saveApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const { personalInfo, academicInfo, programmeCategory, programmeStream } = req.body;

    const updateData = {};
    if (personalInfo) updateData.personalInfo = personalInfo;
    if (academicInfo) updateData.academicInfo = academicInfo;
    if (programmeCategory) updateData.programmeCategory = programmeCategory;
    if (programmeStream) updateData.programmeStream = programmeStream;

    const updatedApp = await dbHelper.updateApplication(userId, updateData);
    res.json(updatedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error saving application' });
  }
};

export const submitApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const application = await dbHelper.findApplicationByUser(userId);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (!application.programmeStream) {
      return res.status(400).json({ message: 'Please select a programme stream before submitting' });
    }

    if (!application.personalInfo?.fullName || !application.personalInfo?.mobile) {
      return res.status(400).json({ message: 'Please fill in mandatory Personal Details before submitting' });
    }

    if (!application.academicInfo?.tenth?.registerNumber || !application.academicInfo?.twelfth?.registerNumber) {
      return res.status(400).json({ message: 'Please fill in Academic Information before submitting' });
    }

    const updatedApp = await dbHelper.updateApplication(userId, { status: 'Submitted' });

    await dbHelper.createNotification(
      userId,
      `Your application for ${application.programmeStream} has been submitted successfully. Please complete the document uploads and payment.`,
      'success'
    );

    res.json({ message: 'Application submitted successfully', application: updatedApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error submitting application' });
  }
};
