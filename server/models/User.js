const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true }, // Indexed for speed
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'admin'], default: 'patient' },
  appointments: [{
    date: Date,
    details: String,
    status: { type: String, default: 'Pending' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);