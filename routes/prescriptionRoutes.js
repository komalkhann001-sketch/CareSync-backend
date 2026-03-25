const express = require('express');
const router = express.Router();
const {
  getPrescriptions,
  addPrescription,
  deletePrescription,
} = require('../controllers/prescriptionController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getPrescriptions);
router.post('/', protect, addPrescription);
router.delete('/:id', protect, admin, deletePrescription);

module.exports = router;
