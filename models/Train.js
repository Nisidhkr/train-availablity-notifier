const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainNumber: String,
  totalSeats: Number,
  bookedSeats: Number,
  notifyTriggered: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Train", trainSchema);
