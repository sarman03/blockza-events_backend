// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { 
      type: String, required: true
      // enum: ["Upcoming", "Ongoing", "Ended"], 
      // default: "Upcoming" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);