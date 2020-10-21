const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
};
exports.getId = async (req, res) => {
  try {
    const seat = await Seat.findById({ _id: req.params.id});
    if(seat) {
      res.json(seat);
    } else {
      res.status(500).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    req.io.emit('seatsUpdate', await Seat.find());
    res.json({ message: 'Ok' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
  // if(db.seats.some(item => (item.seat === payload.seat && item.day === payload.day))) {
  //   res.json({message: 'The slot is already taken...'})
  // }
};

exports.update = async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const seat = await Seat.findById({ _id: req.params.id });
    if(seat) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { day: day, seat: seat, client: client, email: email } });
      res.json({ message: 'Ok'});
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById({ _id: req.params.id });
    if(seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ok' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch(err) {
    res.status(500).json({ message: err });
  }
};