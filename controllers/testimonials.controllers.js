const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if(!test) {
      res.status(404).json({ message: 'Not found'});
    } else {
      res.json(test);
    }
  } catch(err) {
    res.status(500).json({ message: err});
  }
};
exports.getId = async (req, res) => {
  try {
    const test = await Testimonial.findById({ _id: req.params.id });
    if(test) {
      res.json(test);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { author, text } = req.body;
  try {
    const test = await Testimonial.findById({ _id: req.params.id});
    if(test) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err});
  }
};

exports.delete = async (req, res) => {
  try {
    const test = await Testimonial.findById({ _id: req.params.id });
    if(test) {
      await Testimonial.deleteOne({ _id: req.params.id });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};