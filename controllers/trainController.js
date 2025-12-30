const Train = require("../models/Train");

const getStatus = async (req, res) => {
  const train = await Train.findOne({ trainNumber: "DEMO10" });

  res.json({
    totalSeats: train.totalSeats,
    bookedSeats: train.bookedSeats,
    availableSeats: Math.max(train.totalSeats - train.bookedSeats, 0),
    waiting: Math.max(train.bookedSeats - train.totalSeats, 0)
  });
};

const bookSeat = async (req, res) => {
  const train = await Train.findOne({ trainNumber: "DEMO10" });

  train.bookedSeats += 1;

  // 🔥 VERY IMPORTANT
  if (train.bookedSeats > train.totalSeats) {
    train.notifyTriggered = false;
  }

  await train.save();
  res.json({ message: "Seat booked" });
};

const cancelSeat = async (req, res) => {
  const train = await Train.findOne({ trainNumber: "DEMO10" });

  if (train.bookedSeats > 0) {
    train.bookedSeats -= 1;
  }

  await train.save();
  res.json({ message: "Seat cancelled" });
};

module.exports = { getStatus, bookSeat, cancelSeat };
