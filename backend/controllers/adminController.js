import { dbHelper } from './dbHelper.js';

export const getApplications = async (req, res) => {
  try {
    const apps = await dbHelper.findAllApplications();
    res.json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving applications list' });
  }
};

export const verifyDocument = async (req, res) => {
  try {
    const { applicationNumber, docName, status, comment } = req.body;

    if (!applicationNumber || !docName || !status) {
      return res.status(400).json({ message: 'Missing verification parameters' });
    }

    const application = await dbHelper.findApplicationByNumber(applicationNumber);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const docs = application.documents || [];
    const docIndex = docs.findIndex(d => d.name === docName);

    if (docIndex === -1) {
      return res.status(404).json({ message: 'Document details not found' });
    }

    docs[docIndex].status = status; // 'Verified', 'Rejected', 'Pending', 'Uploaded'
    docs[docIndex].comment = comment || '';

    // Determine the overall application status based on document reviews
    let overallStatus = application.status;

    if (status === 'Rejected') {
      overallStatus = 'Rejected';
      await dbHelper.createNotification(
        application.userId._id || application.userId,
        `Document "${docName}" was rejected. Reason: ${comment || 'No reason provided.'}. Please re-upload.`,
        'error'
      );
    } else if (status === 'Verified') {
      await dbHelper.createNotification(
        application.userId._id || application.userId,
        `Document "${docName}" has been successfully verified.`,
        'success'
      );

      // Check if all uploaded documents are verified
      const allVerified = docs.every(d => d.status === 'Verified');
      if (allVerified && docs.length > 0) {
        overallStatus = 'Verified';
        await dbHelper.createNotification(
          application.userId._id || application.userId,
          `All submitted documents have been verified. Your application status is now Verified.`,
          'success'
        );
      }
    } else {
      // For 'Pending' or 'Uploaded'
      overallStatus = 'Under Review';
    }

    const updatedApp = await dbHelper.updateApplicationByNumber(applicationNumber, {
      documents: docs,
      status: overallStatus
    });

    res.json({
      message: `Document status updated to ${status}`,
      application: updatedApp
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error verifying document' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationNumber, status } = req.body;

    if (!applicationNumber || !status) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const application = await dbHelper.findApplicationByNumber(applicationNumber);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApp = await dbHelper.updateApplicationByNumber(applicationNumber, { status });

    let type = 'info';
    if (status === 'Admission Approved') type = 'success';
    if (status === 'Rejected') type = 'error';

    await dbHelper.createNotification(
      application.userId._id || application.userId,
      `Your application status has been updated to: ${status}.`,
      type
    );

    // If status is Admission Approved, automatically create a dummy Offer Letter note
    if (status === 'Admission Approved') {
      await dbHelper.createNotification(
        application.userId._id || application.userId,
        'Congratulations! Your Admission has been approved. Your Offer Letter is now available in your dashboard.',
        'success'
      );
    }

    res.json({
      message: `Application status updated to ${status}`,
      application: updatedApp
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating application status' });
  }
};
