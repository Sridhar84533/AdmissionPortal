import { dbHelper } from './dbHelper.js';

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
