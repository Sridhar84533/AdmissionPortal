import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbHelper } from './dbHelper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, and PNG are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

export const uploadDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!docName) {
      return res.status(400).json({ message: 'Document name not specified' });
    }

    const application = await dbHelper.findApplicationByUser(userId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found. Please start your application first.' });
    }

    // Clean existing document with same name if any
    const existingDocs = application.documents || [];
    const targetDoc = existingDocs.find(d => d.name === docName);
    if (targetDoc) {
      const fullPath = path.join(UPLOADS_DIR, targetDoc.filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    const newDoc = {
      name: docName,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      status: 'Uploaded',
      comment: ''
    };

    let updatedDocs = existingDocs.filter(d => d.name !== docName);
    updatedDocs.push(newDoc);

    // If application status was Rejected, and documents are being uploaded, keep Under Review or Submitted
    let newStatus = application.status;
    if (application.status === 'Draft') {
      newStatus = 'Draft'; // Keep Draft if they haven't submitted yet
    } else if (application.status === 'Rejected' || application.status === 'Submitted') {
      newStatus = 'Under Review';
    }

    const updatedApp = await dbHelper.updateApplication(userId, {
      documents: updatedDocs,
      status: newStatus
    });

    await dbHelper.createNotification(
      userId,
      `Document "${docName}" uploaded successfully.`,
      'info'
    );

    res.json({
      message: 'Document uploaded successfully',
      documents: updatedApp.documents,
      status: updatedApp.status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || 'Server error uploading document' });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docName } = req.body;

    if (!docName) {
      return res.status(400).json({ message: 'Document name not specified' });
    }

    const application = await dbHelper.findApplicationByUser(userId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const targetDoc = application.documents.find(d => d.name === docName);
    if (!targetDoc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Delete file
    const fullPath = path.join(UPLOADS_DIR, targetDoc.filename);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    const updatedDocs = application.documents.filter(d => d.name !== docName);
    const updatedApp = await dbHelper.updateApplication(userId, {
      documents: updatedDocs
    });

    await dbHelper.createNotification(
      userId,
      `Document "${docName}" has been deleted.`,
      'info'
    );

    res.json({
      message: 'Document deleted successfully',
      documents: updatedApp.documents
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error deleting document' });
  }
};
