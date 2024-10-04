// Importing required modules
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const app = express();
const server = http.createServer(app);
dotenv.config({ path: "./config/config.env" });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * means all
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // * means all
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); // * means all
    return res.status(200).json({});
  }
  next();
});

// Routes
const loginRoute = require("./routes/login_route.js");
const socketIo = require("socket.io");
app.use("/login", loginRoute);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//Select random word
app.get("/random", (req, res) => {
  fs.readFile("words.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    // Split file content into an array of words
    const wordsArray = data
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    // Randomly select a word from the array
    const randomWord =
      wordsArray[Math.floor(Math.random() * wordsArray.length)];

    // Send the random word as a response
    res.send(randomWord);
  });
});

// Starting the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
