const express = require("express");
const router = express.Router();

const {
  getStatus,
  bookSeat,
  cancelSeat
} = require("../controllers/trainController");

router.get("/status", getStatus);
router.post("/book", bookSeat);
router.post("/cancel", cancelSeat);

module.exports = router;
