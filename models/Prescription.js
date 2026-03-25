const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    medicineName: { type: String, required: [true, 'Medicine name is required'] },
    dosage: { type: String, required: [true, 'Dosage is required'] },
    duration: { type: String, required: [true, 'Duration is required'] },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
