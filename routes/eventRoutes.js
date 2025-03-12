// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');
const { upload } = require('../middleware/upload');

// Get all events
router.get('/', getEvents);

// Get single event
router.get('/:id', getEventById);

// Create event with image upload
router.post('/', upload.single('image'), createEvent);

// Update event
router.put('/:id', upload.single('image'), updateEvent);

// Delete event
router.delete('/:id', deleteEvent);

module.exports = router;