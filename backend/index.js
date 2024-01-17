const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoute = require("./routes/authRoute.js");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { generateSecretKey } = require("./helpers/authHelper.js");
const cron = require("./cron.js");

//configure env
dotenv.config();

//databse config
connectDB();

//Create a limiter with specified options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: "Too many requests from this IP, please try again later.",
});

//rest object
const app = express();

//middelwares
app.use(limiter);
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);

// Custom error handling middleware
app.use((err, req, res, next) => {
  try {
    if (err.message.includes("rate limit")) {
      res.status(429).json({
        success: false,
        message: "Rate limit exceeded, please try again later.",
      });
    } else {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error during error handling",
    });
  } finally {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.use("/cron", cron);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Test API</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  // Generate the sceret keys
  generateSecretKey();
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
