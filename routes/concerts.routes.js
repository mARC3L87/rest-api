const express = require('express');
const router = express.Router();

const concertController = require('../controllers/concerts.controllers');

router.get('/concerts', concertController.getAll);

router.get('/concerts/:id', concertController.getId);

router.get('/concerts/performer/:performer', concertController.getPerformer);

router.get('/concerts/genre/:genre', concertController.getGenre);

router.get('/concerts/price/day/:day', concertController.getDay);

router.get('/concerts/price/:price_min/:price_max', concertController.getPrice);

router.post('/concerts', concertController.post);

router.put('/concerts/:id', concertController.update);

router.delete('/concerts/:id', concertController.delete);

module.exports = router;