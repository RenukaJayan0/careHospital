const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid email format'] 
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'], required: true },
});

module.exports = mongoose.model('User', userSchema);
