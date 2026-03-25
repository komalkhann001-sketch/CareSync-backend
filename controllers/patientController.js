const Patient = require('../models/Patient');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a patient
// @route   POST /api/patients
// @access  Private
const addPatient = async (req, res, next) => {
  const { name, age, gender, phone, email, address, medicalHistory } = req.body;

  try {
    const patient = await Patient.create({
      name,
      age,
      gender,
      phone,
      email,
      address,
      medicalHistory,
    });

    if (patient) {
      res.status(201).json(patient);
    } else {
      res.status(400);
      throw new Error('Invalid patient data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Private/Admin
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
      patient.name = req.body.name || patient.name;
      patient.age = req.body.age || patient.age;
      patient.gender = req.body.gender || patient.gender;
      patient.phone = req.body.phone || patient.phone;
      patient.email = req.body.email || patient.email;
      patient.address = req.body.address || patient.address;
      patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;

      const updatedPatient = await patient.save();
      res.json(updatedPatient);
    } else {
      res.status(404);
      throw new Error('Patient not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Private/Admin
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (patient) {
      await patient.deleteOne();
      res.json({ message: 'Patient removed' });
    } else {
      res.status(404);
      throw new Error('Patient not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
};
