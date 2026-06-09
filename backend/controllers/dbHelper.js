import { getDbMode, jsonDb } from '../config/db.js';
import { User, Application, Appointment, SupportTicket, Notification } from '../models/models.js';

export const dbHelper = {
  // Users
  findUserByEmail: async (email) => {
    if (getDbMode() === 'mongodb') {
      return await User.findOne({ email });
    } else {
      const user = jsonDb.findOne('users', { email });
      if (user) return { ...user, id: user._id };
      return null;
    }
  },

  createUser: async (userData) => {
    if (getDbMode() === 'mongodb') {
      const user = new User(userData);
      return await user.save();
    } else {
      const user = jsonDb.insert('users', userData);
      return { ...user, id: user._id };
    }
  },

  updateUserPassword: async (userId, newPassword) => {
    if (getDbMode() === 'mongodb') {
      return await User.findByIdAndUpdate(userId, { password: newPassword });
    } else {
      return jsonDb.update('users', { _id: userId }, { password: newPassword });
    }
  },

  // Applications
  findApplicationByUser: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await Application.findOne({ userId });
    } else {
      const app = jsonDb.findOne('applications', { userId });
      if (app) return { ...app, id: app._id };
      return null;
    }
  },

  findApplicationByNumber: async (applicationNumber) => {
    if (getDbMode() === 'mongodb') {
      return await Application.findOne({ applicationNumber });
    } else {
      const app = jsonDb.findOne('applications', { applicationNumber });
      if (app) return { ...app, id: app._id };
      return null;
    }
  },

  createApplication: async (appData) => {
    if (getDbMode() === 'mongodb') {
      const app = new Application(appData);
      return await app.save();
    } else {
      const app = jsonDb.insert('applications', appData);
      return { ...app, id: app._id };
    }
  },

  updateApplication: async (userId, updateData) => {
    if (getDbMode() === 'mongodb') {
      return await Application.findOneAndUpdate({ userId }, updateData, { new: true, upsert: true });
    } else {
      const existing = jsonDb.findOne('applications', { userId });
      if (existing) {
        // Deep merge of fields like personalInfo, academicInfo
        const updated = {
          ...existing,
          ...updateData,
          personalInfo: { ...existing.personalInfo, ...(updateData.personalInfo || {}) },
          academicInfo: {
            ...existing.academicInfo,
            tenth: { ...(existing.academicInfo?.tenth || {}), ...(updateData.academicInfo?.tenth || {}) },
            twelfth: { ...(existing.academicInfo?.twelfth || {}), ...(updateData.academicInfo?.twelfth || {}) },
            degree: { ...(existing.academicInfo?.degree || {}), ...(updateData.academicInfo?.degree || {}) }
          },
          paymentDetails: { ...existing.paymentDetails, ...(updateData.paymentDetails || {}) }
        };
        jsonDb.update('applications', { userId }, updated);
        return { ...updated, id: updated._id };
      } else {
        const app = jsonDb.insert('applications', { userId, ...updateData });
        return { ...app, id: app._id };
      }
    }
  },

  updateApplicationByNumber: async (applicationNumber, updateData) => {
    if (getDbMode() === 'mongodb') {
      return await Application.findOneAndUpdate({ applicationNumber }, updateData, { new: true });
    } else {
      const existing = jsonDb.findOne('applications', { applicationNumber });
      if (existing) {
        const updated = {
          ...existing,
          ...updateData
        };
        jsonDb.update('applications', { applicationNumber }, updated);
        return { ...updated, id: updated._id };
      }
      return null;
    }
  },

  findAllApplications: async () => {
    if (getDbMode() === 'mongodb') {
      return await Application.find().populate('userId', 'name email');
    } else {
      const apps = jsonDb.getCollection('applications');
      const users = jsonDb.getCollection('users');
      return apps.map(app => {
        const u = users.find(x => x._id === app.userId);
        return {
          ...app,
          id: app._id,
          userId: u ? { name: u.name, email: u.email, _id: u._id } : { name: 'Unknown', email: '', _id: app.userId }
        };
      });
    }
  },

  // Appointments
  findAppointmentByUser: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await Appointment.findOne({ userId });
    } else {
      const appt = jsonDb.findOne('appointments', { userId });
      if (appt) return { ...appt, id: appt._id };
      return null;
    }
  },

  createAppointment: async (apptData) => {
    if (getDbMode() === 'mongodb') {
      const appt = new Appointment(apptData);
      return await appt.save();
    } else {
      const appt = jsonDb.insert('appointments', apptData);
      return { ...appt, id: appt._id };
    }
  },

  updateAppointment: async (userId, updateData) => {
    if (getDbMode() === 'mongodb') {
      return await Appointment.findOneAndUpdate({ userId }, updateData, { new: true, upsert: true });
    } else {
      const existing = jsonDb.findOne('appointments', { userId });
      if (existing) {
        const updated = { ...existing, ...updateData };
        jsonDb.update('appointments', { userId }, updated);
        return { ...updated, id: updated._id };
      } else {
        const appt = jsonDb.insert('appointments', { userId, ...updateData });
        return { ...appt, id: appt._id };
      }
    }
  },

  deleteAppointment: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await Appointment.findOneAndDelete({ userId });
    } else {
      return jsonDb.delete('appointments', { userId });
    }
  },

  // Support Tickets
  createTicket: async (ticketData) => {
    if (getDbMode() === 'mongodb') {
      const ticket = new SupportTicket(ticketData);
      return await ticket.save();
    } else {
      const ticket = jsonDb.insert('supportTickets', ticketData);
      return { ...ticket, id: ticket._id };
    }
  },

  findTicketsByUser: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await SupportTicket.find({ userId }).sort({ createdAt: -1 });
    } else {
      const tickets = jsonDb.find('supportTickets', { userId });
      return tickets.map(t => ({ ...t, id: t._id })).reverse();
    }
  },

  findAllTickets: async () => {
    if (getDbMode() === 'mongodb') {
      return await SupportTicket.find().populate('userId', 'name email').sort({ createdAt: -1 });
    } else {
      const tickets = jsonDb.getCollection('supportTickets');
      const users = jsonDb.getCollection('users');
      return tickets.map(t => {
        const u = users.find(x => x._id === t.userId);
        return {
          ...t,
          id: t._id,
          userId: u ? { name: u.name, email: u.email, _id: u._id } : { name: 'Unknown', email: '', _id: t.userId }
        };
      }).reverse();
    }
  },

  updateTicketReplies: async (ticketId, reply) => {
    if (getDbMode() === 'mongodb') {
      return await SupportTicket.findByIdAndUpdate(ticketId, {
        $push: { replies: reply }
      }, { new: true });
    } else {
      const ticket = jsonDb.findOne('supportTickets', { _id: ticketId });
      if (ticket) {
        const updatedReplies = [...(ticket.replies || []), { ...reply, createdAt: new Date().toISOString() }];
        jsonDb.update('supportTickets', { _id: ticketId }, { replies: updatedReplies });
        return { ...ticket, replies: updatedReplies, id: ticket._id };
      }
      return null;
    }
  },

  // Notifications
  createNotification: async (userId, text, type = 'info') => {
    if (getDbMode() === 'mongodb') {
      const notif = new Notification({ userId, text, type });
      return await notif.save();
    } else {
      const notif = jsonDb.insert('notifications', { userId, text, type, read: false });
      return { ...notif, id: notif._id };
    }
  },

  findNotificationsByUser: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await Notification.find({ userId }).sort({ createdAt: -1 });
    } else {
      const notifs = jsonDb.find('notifications', { userId });
      return notifs.map(n => ({ ...n, id: n._id })).reverse();
    }
  },

  markNotificationsRead: async (userId) => {
    if (getDbMode() === 'mongodb') {
      return await Notification.updateMany({ userId, read: false }, { read: true });
    } else {
      const items = jsonDb.getCollection('notifications');
      const updated = items.map(n => n.userId === userId ? { ...n, read: true } : n);
      jsonDb.saveCollection('notifications', updated);
      return { modifiedCount: 1 };
    }
  }
};
