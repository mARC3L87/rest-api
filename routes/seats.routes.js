const express = require('express');
const router = express.Router();

const seatController = require('../controllers/seats.controllers');

router.get('/seats', seatController.getAll);

router.get('/seats/:id', seatController.getId);

router.post('/seats', seatController.post);

router.put('/seats/:id', seatController.update);

router.delete('/seats/:id', seatController.delete);

module.exports = router;