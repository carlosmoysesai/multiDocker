const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

require('dotenv').config();

const mongoString = process.env.DATABASE_URL;


mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connected to the database'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})

module.exports = app;