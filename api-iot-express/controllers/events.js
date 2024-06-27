const Event = require('../models/Event');
const jwtConfig = require('../config/jwt');
const jwt = require('jsonwebtoken');

const getAllEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

const createEvent = async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
};

const updateEvent = async (req, res) => {
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedEvent) {
    return res.status(404).send('Evento não encontrado');
  }
  res.json(updatedEvent);
};

const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Evento removido com sucesso' });
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent
};