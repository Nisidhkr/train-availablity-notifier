const cron = require("node-cron");
const Train = require("../models/Train");

// 🧠 CRON INTERNAL MEMORY
let lastBookedSeats = null;

cron.schedule("*/5 * * * * *", async () => {
  const train = await Train.findOne({ trainNumber: "DEMO10" });
  if (!train) return;

  if (lastBookedSeats === null) {
    lastBookedSeats = train.bookedSeats;
    return;
  }

  console.log(
    `CRON → last=${lastBookedSeats}, curr=${train.bookedSeats}, total=${train.totalSeats}, notified=${train.notifyTriggered}`
  );

  // 🔔 EXACT TRANSITION
  if (
    lastBookedSeats > train.totalSeats &&
    train.bookedSeats <= train.totalSeats &&
    !train.notifyTriggered
  ) {
    console.log("🔔🔔🔔 SEAT AVAILABLE – NOTIFICATION FIRED 🔔🔔🔔");

    train.notifyTriggered = true;
    await train.save();
  }

  // update memory AFTER check
  lastBookedSeats = train.bookedSeats;
});
