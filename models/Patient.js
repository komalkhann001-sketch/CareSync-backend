const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Patient name is required'] },
    age: { type: Number, required: [true, 'Age is required'] },
    gender: { type: String, required: [true, 'Gender is required'] },
    phone: { type: String, required: [true, 'Phone number is required'] },
    email: { type: String },
    address: { type: String },
    medicalHistory: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
