const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, admin, deleteAppointment);

module.exports = router;
