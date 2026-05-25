const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// @desc    Public Appointment Booking (No Auth Required)
// @route   POST /api/appointments/public-book
// @access  Public
const publicBookAppointment = async (req, res, next) => {
  const { name, email, phone, age, gender, doctorId, date, timeSlot, reason } = req.body;

  try {
    // 1. Check if patient already exists by email
    let patient = await Patient.findOne({ email });

    if (!patient) {
      // 2. Create new patient if doesn't exist
      patient = await Patient.create({
        name,
        email,
        phone,
        age: age || 0,
        gender: gender || 'Other',
      });
    }

    // 3. Create appointment
    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId,
      patientName: name,
      date,
      timeSlot,
      reason: reason || 'Public Appointment Request',
      status: 'Pending',
    });

    if (appointment) {
      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully! Admin will confirm soon.',
        data: appointment
      });
    } else {
      res.status(400);
      throw new Error('Invalid appointment data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
      .populate('patientId', 'name phone')
      .populate('doctorId', 'name specialization')
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res, next) => {
  const { patientId, doctorId, patientName, date, timeSlot, reason } = req.body;

  try {
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      patientName,
      date,
      timeSlot,
      reason,
    });

    if (appointment) {
      res.status(201).json(appointment);
    } else {
      res.status(400);
      throw new Error('Invalid appointment data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
const updateAppointmentStatus = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      appointment.status = req.body.status || appointment.status;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404);
      throw new Error('Appointment not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      await appointment.deleteOne();
      res.json({ message: 'Appointment removed' });
    } else {
      res.status(404);
      throw new Error('Appointment not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  publicBookAppointment,
};

