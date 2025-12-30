require("dotenv").config();
const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const trainRoutes = require("./routes/trainRoutes");

const app = express();

// DB connect
connectDB();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Test route (keep for sanity)
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

// API routes
app.use("/api/train", trainRoutes);

// 🔔 IMPORTANT: START CRON JOB
require("./cron/seatMonitor");

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
