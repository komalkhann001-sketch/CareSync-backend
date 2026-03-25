const express = require('express');
const router = express.Router();
const {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getPatients);
router.post('/', protect, addPatient);
router.put('/:id', protect, admin, updatePatient);
router.delete('/:id', protect, admin, deletePatient);

module.exports = router;
