const express = require('express');
const Event = require('../models/Event'); // Assuming your event model is in 'models' directory

const router = express.Router();

// GET Route (Fetch all events)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching events');
  }
});

//Post Method
router.post('/post', async (req, res) => {
  const data = new Event({
    type: req.body.type,
    deviceId: req.body.deviceId,
    timestamp: req.body.timestamp,
    details: req.body.details
  })
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Get all Method
router.get('/getAll', async (req, res) => {
  try {
    const data = await Event.find();
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
  try {
    const data = await Event.findById(req.params.id);
    res.json(data)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Event.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Event.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
