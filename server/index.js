const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dbConfig = require("./config/database_config");

dotenv.config(); // Load environment variables

// create an express app
const app = express();
app.use(express.json());


// connect to MongoDB
mongoose.connect(dbConfig.mongoURI, dbConfig.options)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
  });


// define routes here
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
