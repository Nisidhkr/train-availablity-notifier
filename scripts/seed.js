const mongoose = require("mongoose");
const Train = require("../models/Train");

mongoose.connect("mongodb://127.0.0.1:27017/railway");

async function seed() {
  await Train.deleteMany();

  await Train.create({
  trainNumber: "DEMO10",
  totalSeats: 10,
  bookedSeats: 12,
  previousBookedSeats: 12,
  notifyTriggered: false
});


  console.log("✅ Demo train (10 seats) inserted");
  process.exit();
}

seed();
