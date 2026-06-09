import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbHelper } from './dbHelper.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyforapplicantportal';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    const userExists = await dbHelper.findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ALL registrations via the public register endpoint are APPLICANTS only.
    // Admin role must be assigned manually in MongoDB.
    const userRole = 'applicant';

    const newUser = await dbHelper.createUser({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    // Automatically initialize a draft application for the new applicant
    const applicationNumber = 'APP' + Math.floor(100000 + Math.random() * 900000);
    await dbHelper.createApplication({
      userId: newUser._id || newUser.id,
      applicationNumber,
      programmeCategory: '',
      programmeStream: '',
      status: 'Draft',
      personalInfo: {
        fullName: name,
        email: email
      },
      academicInfo: {},
      documents: [],
      paymentStatus: 'Pending'
    });

    await dbHelper.createNotification(
      newUser._id || newUser.id,
      'Welcome! Your draft application has been created. Application Number: ' + applicationNumber,
      'info'
    );

    const token = jwt.sign(
      { id: newUser._id || newUser.id, role: userRole, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id || newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: userRole
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await dbHelper.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id || user.id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide both current and new passwords' });
  }

  try {
    const user = await dbHelper.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await dbHelper.updateUserPassword(userId, hashedPassword);
    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating password' });
  }
};
