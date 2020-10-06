const express = require('express');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const app = express();
const port = 8001;

const db =  [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded());
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});
app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * 2)]);
});
app.get('/testimonials/:id', (req, res) => {
  res.json(db[req.params.id -1]);
});

app.post('/testimonials/', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const payload = {
    id,
    author: 'James Dean',
    text: 'You tearing me apart'
  };
  db.push(payload);
  res.json({ message: 'OK', id });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const payload = {
    id: req.params.id,
    author: 'James Dean',
    text: 'You tearing me apart'
  };
  db.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const { author, text, } = req.body;
  const payload = {
    id: req.params.id,
    author,
    text
  };
  db.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});