const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  publicBookAppointment,
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/public-book', publicBookAppointment);

router.get('/', protect, getAppointments);
router.post('/', protect, createAppointment);
router.put('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, admin, deleteAppointment);

module.exports = router;

