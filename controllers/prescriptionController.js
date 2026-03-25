const Prescription = require('../models/Prescription');

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({})
      .populate({ path: 'patientId', select: 'name age gender' })
      .populate({ path: 'doctorId', select: 'name specialization' });
    res.json(prescriptions);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a prescription
// @route   POST /api/prescriptions
// @access  Private
const addPrescription = async (req, res, next) => {
  const { patientId, appointmentId, doctorId, medicineName, dosage, duration, notes } = req.body;

  try {
    const prescription = await Prescription.create({
      patientId,
      appointmentId,
      doctorId,
      medicineName,
      dosage,
      duration,
      notes,
    });

    if (prescription) {
      res.status(201).json(prescription);
    } else {
      res.status(400);
      throw new Error('Invalid prescription data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private/Admin
const deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (prescription) {
      await prescription.deleteOne();
      res.json({ message: 'Prescription removed' });
    } else {
      res.status(404);
      throw new Error('Prescription not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrescriptions,
  addPrescription,
  deletePrescription,
};
