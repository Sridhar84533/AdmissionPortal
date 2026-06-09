import { dbHelper } from './dbHelper.js';

export const getAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointment = await dbHelper.findAppointmentByUser(userId);
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving appointment' });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, time, mode } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Please select a date and time for the appointment' });
    }

    const application = await dbHelper.findApplicationByUser(userId);
    if (!application) {
      return res.status(400).json({ message: 'Please start your application before booking an interview.' });
    }

    // Initialize appointment
    const newAppointment = await dbHelper.updateAppointment(userId, {
      date,
      time,
      mode: mode || 'Online',
      status: 'Pending'
    });

    // Update application timeline status to Interview Scheduled
    await dbHelper.updateApplication(userId, { status: 'Under Review' });

    await dbHelper.createNotification(
      userId,
      `Interview appointment booked for ${date} at ${time} (${mode}). Status is pending approval.`,
      'info'
    );

    res.json({
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error booking appointment' });
  }
};

export const rescheduleAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, time, mode } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Please select a date and time' });
    }

    const existingAppt = await dbHelper.findAppointmentByUser(userId);
    if (!existingAppt) {
      return res.status(404).json({ message: 'No active appointment found to reschedule' });
    }

    const updatedAppt = await dbHelper.updateAppointment(userId, {
      date,
      time,
      mode: mode || existingAppt.mode,
      status: 'Rescheduled'
    });

    await dbHelper.createNotification(
      userId,
      `Interview rescheduled to ${date} at ${time}.`,
      'warning'
    );

    res.json({
      message: 'Appointment rescheduled successfully',
      appointment: updatedAppt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error rescheduling appointment' });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingAppt = await dbHelper.findAppointmentByUser(userId);

    if (!existingAppt) {
      return res.status(404).json({ message: 'No appointment found to cancel' });
    }

    await dbHelper.deleteAppointment(userId);

    await dbHelper.createNotification(
      userId,
      `Your interview appointment has been cancelled.`,
      'error'
    );

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error cancelling appointment' });
  }
};
