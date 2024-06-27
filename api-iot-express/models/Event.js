// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  deviceId: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);
