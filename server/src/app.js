const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("../config/database");

const authRoutes = require("../routes/auth");
const appointmentRoutes = require("../routes/appointments");
const serviceRoutes = require("../routes/services");
const dashboardRoutes = require("../routes/dashboard");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
