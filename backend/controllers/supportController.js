import { dbHelper } from './dbHelper.js';

export const createTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, message, applicationNumber } = req.body;

    if (!category || !message) {
      return res.status(400).json({ message: 'Category and message are required fields' });
    }

    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : '';

    const newTicket = await dbHelper.createTicket({
      userId,
      applicationNumber: applicationNumber || '',
      category,
      message,
      attachment: attachmentPath,
      replies: []
    });

    await dbHelper.createNotification(
      userId,
      `Support ticket created under category "${category}". We will respond shortly.`,
      'info'
    );

    res.status(201).json({
      message: 'Support ticket submitted successfully',
      ticket: newTicket
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error submitting support ticket' });
  }
};

export const getTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const tickets = await dbHelper.findTicketsByUser(userId);
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving tickets' });
  }
};

export const getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await dbHelper.findAllTickets();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error retrieving support tickets' });
  }
};

export const addReply = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;
    const sender = req.user.role; // 'applicant' or 'admin'

    if (!message) {
      return res.status(400).json({ message: 'Reply message cannot be empty' });
    }

    const reply = {
      sender,
      message,
      createdAt: new Date().toISOString()
    };

    const updatedTicket = await dbHelper.updateTicketReplies(ticketId, reply);
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Trigger notification
    if (sender === 'admin') {
      await dbHelper.createNotification(
        updatedTicket.userId,
        `Admin has replied to your support ticket regarding: ${updatedTicket.category}`,
        'info'
      );
    }

    res.json(updatedTicket);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error submitting reply' });
  }
};
