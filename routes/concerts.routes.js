const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});
router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts[req.params.id -1]);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  const payload = {
    id,
    performer: 'James Dean',
    genre: 'country',
    price: 30,
    day: 2,
    image: '/img/uploads/2f342s4fsdg.jpg'
  };
  db.concerts.push(payload);
  res.json({ message: 'OK', id });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const payload = {
    id: req.params.id,
    performer: 'James Dean',
    genre: 'country',
    price: 30,
    day: 2,
    image: '/img/uploads/2f342s4fsdg.jpg'
  };
  db.concerts.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const payload = {
    id: req.params.id,
  };
  db.concerts.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

module.exports = router;