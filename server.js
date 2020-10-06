const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 8001;

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);



app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});