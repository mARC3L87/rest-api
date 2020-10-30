const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getId = async (req, res) => {
  try {
    const con = await Concert.findById({ _id: req.params.id });
    if(con) {
      res.json(con);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const per = await Concert.findOne({ performer: req.params.performer });
    if(per) {
      res.json(per);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const gen = await Concert.findOne({ genre: req.params.genre });
    if(gen) {
      res.json(gen);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const day = await Concert.find({ day: req.params.day });
    if(day) {
      res.json(day);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getPrice = async (req, res) => {
  try {
    const price = await Concert.find({ price: { $gte: req.params.price_min, $lte: req.params.price_max } });
    if(price) {
      res.json(price);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
 }
};

exports.update = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const con = await Concert.findById({ _id: req.params.id});
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found'});
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete= async (req, res) => {  
  try {
    const con = await Concert.findById({ _id: req.params.id});
    if(con) {
      await Concert.deleteOne({ _id: req.params.id});
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};