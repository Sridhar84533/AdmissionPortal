import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['applicant', 'admin'], default: 'applicant' },
  name: { type: String, required: true }
}, { timestamps: true });

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  status: { type: String, enum: ['Uploaded', 'Pending', 'Verified', 'Rejected'], default: 'Uploaded' },
  comment: { type: String, default: '' }
});

const ApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicationNumber: { type: String, required: true, unique: true },
  programmeCategory: { type: String, default: '' },
  programmeStream: { type: String, default: '' },
  feeAmount: { type: Number, default: 1500 },
  status: { type: String, enum: ['Draft', 'Submitted', 'Under Review', 'Verified', 'Rejected'], default: 'Draft' },
  personalInfo: {
    fullName: { type: String, default: '' },
    fatherName: { type: String, default: '' },
    motherName: { type: String, default: '' },
    gender: { type: String, default: '' },
    dob: { type: String, default: '' },
    nationality: { type: String, default: '' },
    religion: { type: String, default: '' },
    category: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    mobile: { type: String, default: '' },
    email: { type: String, default: '' },
    altMobile: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    permanentAddress: { type: String, default: '' },
    city: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: '' },
    country: { type: String, default: '' }
  },
  academicInfo: {
    tenth: {
      boardType: { type: String, default: '' },
      schoolName: { type: String, default: '' },
      board: { type: String, default: '' },
      registerNumber: { type: String, default: '' },
      passingYear: { type: String, default: '' },
      percentage: { type: String, default: '' },
      totalMarks: { type: String, default: '' },
      obtainedMarks: { type: String, default: '' }
    },
    twelfth: {
      puCollegeName: { type: String, default: '' },
      boardType: { type: String, default: '' },
      board: { type: String, default: '' },
      registerNumber: { type: String, default: '' },
      passingYear: { type: String, default: '' },
      percentage: { type: String, default: '' }
    },
    degree: {
      course: { type: String, default: '' },
      collegeName: { type: String, default: '' },
      universityName: { type: String, default: '' },
      degreeType: { type: String, default: '' },
      cgpa: { type: String, default: '' },
      percentage: { type: String, default: '' },
      passingYear: { type: String, default: '' },
      degreeStatus: { type: String, default: '' }
    }
  },
  documents: [DocumentSchema],
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  paymentDetails: {
    transactionId: { type: String, default: '' },
    paymentMethod: { type: String, default: '' },
    paidAt: { type: String, default: '' },
    receiptPath: { type: String, default: '' }
  }
}, { timestamps: true });

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, enum: ['Online', 'Offline'], default: 'Online' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rescheduled', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

const SupportTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicationNumber: { type: String, default: '' },
  category: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String, default: '' },
  replies: [{
    sender: { type: String, enum: ['applicant', 'admin'], required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const NotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  type: { type: String, default: 'info' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
export const Application = mongoose.model('Application', ApplicationSchema);
export const Appointment = mongoose.model('Appointment', AppointmentSchema);
export const SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema);
export const Notification = mongoose.model('Notification', NotificationSchema);
