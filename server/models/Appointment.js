const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true }, // Therapy, Consultation, etc.
  notes: { type: String },
  status: { type: String, default: 'Pending Payment' },
  isPaid: { type: Boolean, default: false },
  paymentId: { type: String } // PayPal Transaction ID
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);