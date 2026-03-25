const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Doctor name is required'] },
    specialization: { type: String, required: [true, 'Specialization is required'] },
    phone: { type: String, required: [true, 'Phone number is required'] },
    email: { type: String, required: [true, 'Email is required'], unique: true },
    availableDays: [{ type: String }],
    profilePhoto: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional: Link to User model
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
