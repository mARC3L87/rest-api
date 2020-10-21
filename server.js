const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8001;

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

mongoose.connect('mongodb+srv://marcel-87:pipolonto1@cluster0.ke4bx.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database')
});
db.on('error', err => {
  console.log('Error', err);
});
const server = app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port:${port}`);
});
const io = socket(server);
io.on('connection', () => {
  console.log('New socket');
});
