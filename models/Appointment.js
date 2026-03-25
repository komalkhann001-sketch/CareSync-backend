const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: [true, 'Patient name is required for convenience'] }, // Redundant but good for UI
    date: { type: String, required: [true, 'Date is required'] },
    timeSlot: { type: String, required: [true, 'Time slot is required'] },
    reason: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
