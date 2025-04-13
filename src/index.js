require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

// Initialize passport config
require("./util/passport");

const db = require("./util/db");
const logger = require("./util/logger");
const { errorHandler } = require("./middleware/errors");

// Routes
const authRoutes = require("./routes/auth");
const crapRoutes = require("./routes/craps");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Connect to database
db.connect();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/craps", crapRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
