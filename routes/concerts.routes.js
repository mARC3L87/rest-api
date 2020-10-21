const express = require('express');
const router = express.Router();

const concertController = require('../controllers/concerts.controllers');

router.get('/concerts', concertController.getAll);

router.get('/concerts/:id', concertController.getId);

router.post('/concerts', concertController.post);

router.put('/concerts/:id', concertController.update);

router.delete('/concerts/:id', concertController.delete);

module.exports = router;