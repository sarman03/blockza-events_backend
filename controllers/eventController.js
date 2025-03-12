// controllers/eventController.js
const Event = require('../models/Event');
const { cloudinary } = require('../middleware/upload');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const { title, date, location, description, status } = req.body;

    // Create new event
    const event = new Event({
      title,
      date,
      location,
      description,
      status,
    });

    // If there's a file uploaded
    if (req.file) {
      event.imageUrl = req.file.path; // Cloudinary URL
    }

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update text fields
    const { title, date, location, description, status } = req.body;
    if (title) event.title = title;
    if (date) event.date = date;
    if (location) event.location = location;
    if (description) event.description = description;
    if (status) event.status = status;

    // If there's a new file uploaded
    if (req.file) {
      // If the event already has an image and the public ID is stored
      if (event.imageUrl && event.imageUrl.includes('cloudinary')) {
        // Extract public ID from the URL (this is a simplified approach)
        const publicId = event.imageUrl.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(`events/${publicId}`);
        } catch (error) {
          console.log('Error deleting old image', error);
        }
      }
      event.imageUrl = req.file.path;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // If the event has an image, delete it from Cloudinary
    if (event.imageUrl && event.imageUrl.includes('cloudinary')) {
      // Extract public ID from the URL (simplified approach)
      const publicId = event.imageUrl.split('/').pop().split('.')[0];
      try {
        await cloudinary.uploader.destroy(`events/${publicId}`);
      } catch (error) {
        console.log('Error deleting image', error);
      }
    }

    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};