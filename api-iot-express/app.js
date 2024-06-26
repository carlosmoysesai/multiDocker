// app.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const Event = require('./models/Event');

const app = express();
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/iot_events')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rotas
app.get('/events', authenticateToken, async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/events', authenticateToken, async (req, res) => {
  const event = new Event(req.body);
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/events/:id', authenticateToken, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedEvent == null) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/events/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Deleted Event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
