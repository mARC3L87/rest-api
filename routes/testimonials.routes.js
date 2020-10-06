const express = require('express');
const router = express.Router();
const db = require('./../db');
const {v4: uuidv4} = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});
router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * 2)]);
});
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials[req.params.id -1]);
});

router.route('/testimonials/').post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  const payload = {
    id,
    author: 'James Dean',
    text: 'You tearing me apart'
  };
  db.testimonials.push(payload);
  res.json({ message: 'OK', id });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const payload = {
    id: req.params.id,
    author: 'James Dean',
    text: 'You tearing me apart'
  };
  db.testimonials.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const { author, text, } = req.body;
  const payload = {
    id: req.params.id,
    author,
    text
  };
  db.testimonials.splice(0, 1, payload);
  res.json({ message: 'OK' });
});

module.exports = router;