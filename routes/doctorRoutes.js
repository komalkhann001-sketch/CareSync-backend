const express = require('express');
const router = express.Router();
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getDoctors); // Public listing
router.post('/', protect, admin, addDoctor);
router.put('/:id', protect, admin, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);

module.exports = router;
