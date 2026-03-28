const Doctor = require('../models/Doctor');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a doctor
// @route   POST /api/doctors
// @access  Private/Admin
const addDoctor = async (req, res, next) => {
  const { name, specialization, phone, email } = req.body;
  let availableDays = req.body.availableDays;
  
  // Parse availableDays if it's coming as a string from FormData
  if (typeof availableDays === 'string') {
    try {
      availableDays = JSON.parse(availableDays);
    } catch (e) {
      availableDays = [];
    }
  }

  try {
    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      res.status(400);
      throw new Error('Doctor with this email already exists');
    }

    // Since Cloudinary is not configured in .env, we'll use a placeholder URL for now
    // In a real scenario, we would upload req.file.path to Cloudinary here
    const profilePhoto = req.file ? `https://ui-avatars.com/api/?name=${name}&background=random` : '';

    const doctor = await Doctor.create({
      name,
      specialization,
      phone,
      email,
      availableDays,
      profilePhoto,
    });

    if (doctor) {
      res.status(201).json(doctor);
    } else {
      res.status(400);
      throw new Error('Invalid doctor data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      doctor.name = req.body.name || doctor.name;
      doctor.specialization = req.body.specialization || doctor.specialization;
      doctor.phone = req.body.phone || doctor.phone;
      doctor.email = req.body.email || doctor.email;
      doctor.availableDays = req.body.availableDays || doctor.availableDays;
      doctor.profilePhoto = req.body.profilePhoto || doctor.profilePhoto;

      const updatedDoctor = await doctor.save();
      res.json(updatedDoctor);
    } else {
      res.status(404);
      throw new Error('Doctor not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (doctor) {
      await doctor.deleteOne();
      res.json({ message: 'Doctor removed' });
    } else {
      res.status(404);
      throw new Error('Doctor not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
