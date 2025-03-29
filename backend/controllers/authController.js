// In your authRoutes.js (or wherever the registration endpoint is defined)

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Registration route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!email.endsWith('@gmail.com')) {
    return res.status(400).json({ message: 'Email must be a Gmail address' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user (this is just an example, add proper password hashing)
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,  // You should hash the password before saving
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;
