const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({})
      .populate('patientId', 'name phone')
      .populate('doctorId', 'name specialization');
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
};
