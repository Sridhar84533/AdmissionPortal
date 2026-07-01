import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

// Controller imports
import * as authController from './controllers/authController.js';
import * as applicationController from './controllers/applicationController.js';
import * as documentController from './controllers/documentController.js';
import * as paymentController from './controllers/paymentController.js';
import * as appointmentController from './controllers/appointmentController.js';
import * as supportController from './controllers/supportController.js';
import * as adminController from './controllers/adminController.js';
import { dbHelper } from './controllers/dbHelper.js';

// Middleware imports
import { auth, adminOnly } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder for Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// --- API Routes ---

// Health-check / wakeup ping (no auth, instant response)
app.get('/', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));

// Authentication
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.put('/api/auth/password', auth, authController.changePassword);

// Applications
app.get('/api/application', auth, applicationController.getApplication);
app.post('/api/application/save', auth, applicationController.saveApplication);
app.post('/api/application/submit', auth, applicationController.submitApplication);
app.get('/api/application/offer-letter/:appNumber', auth, applicationController.generateOfferLetterPDF);

// Documents
app.post('/api/documents/upload', auth, documentController.upload.single('file'), documentController.uploadDocument);
app.post('/api/documents/delete', auth, documentController.deleteDocument);

// Payments
app.post('/api/payments/pay', auth, paymentController.processPayment);
app.get('/api/payments/receipt/:appNumber', paymentController.generateReceiptPDF);

// Appointments
app.get('/api/appointments', auth, appointmentController.getAppointment);
app.post('/api/appointments/book', auth, appointmentController.bookAppointment);
app.put('/api/appointments/reschedule', auth, appointmentController.rescheduleAppointment);
app.delete('/api/appointments/cancel', auth, appointmentController.cancelAppointment);

// Support
app.get('/api/support', auth, supportController.getTickets);
app.post('/api/support/create', auth, documentController.upload.single('file'), supportController.createTicket);
app.post('/api/support/reply/:ticketId', auth, supportController.addReply);

// Notifications
app.get('/api/notifications', auth, async (req, res) => {
  try {
    const list = await dbHelper.findNotificationsByUser(req.user.id);
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});
app.put('/api/notifications/read', auth, async (req, res) => {
  try {
    await dbHelper.markNotificationsRead(req.user.id);
    res.json({ message: 'Notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking notifications read' });
  }
});

// Admin Dashboard Routes
app.get('/api/admin/applications', auth, adminOnly, adminController.getApplications);
app.post('/api/admin/document/verify', auth, adminOnly, adminController.verifyDocument);
app.post('/api/admin/application/status', auth, adminOnly, adminController.updateApplicationStatus);
app.get('/api/admin/support/tickets', auth, adminOnly, supportController.getAllTicketsAdmin);
app.get('/api/admin/appointment/:userId', auth, adminOnly, adminController.getAppointmentByUser);
app.post('/api/admin/appointment/schedule', auth, adminOnly, adminController.scheduleAppointment);
app.delete('/api/admin/appointment/cancel/:userId', auth, adminOnly, adminController.deleteAppointmentByUser);

// Basic root route
app.get('/', (req, res) => {
  res.send('Admission Portal API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong on the server!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
