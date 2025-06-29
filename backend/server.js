const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const procurementRoutes = require("./routes/procurementRoutes");
const poRoutes = require("./routes/poRoutes");

app.use("/api/users", userRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/procurements", procurementRoutes);
app.use("/api/purchase-orders", poRoutes);

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

