const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonials.controllers');

router.get('/testimonials', testimonialController.getAll)
;
router.get('/testimonials/random', testimonialController.getRandom);

router.get('/testimonials/:id', testimonialController.getId);

router.post('/testimonials/', testimonialController.post);

router.put('/testimonials/:id', testimonialController.update);

router.delete('/testimonials/:id', testimonialController.delete);

module.exports = router;