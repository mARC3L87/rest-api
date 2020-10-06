const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats[req.params.id -1]);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  const payload = {
    id,
    day: 4,
    seat: 30,
    client: 'James Dean',
    email: 'jamesdean@example.com'
  };
  db.seats.push(payload);
  res.json({ message: 'OK', id });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const payload = {
    id: req.params.id,
    day: 4,
    seat: 30,
    client: 'James Dean',
    email: 'jamesdean@example.com'
  };
  db.seats.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const { day, seat, client, email } = req.body;
  const payload = {
    id: req.params.id,
  };
  db.seats.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

module.exports = router;