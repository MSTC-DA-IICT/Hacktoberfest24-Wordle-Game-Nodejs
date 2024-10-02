const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  // ex:  mongoURI: "mongodb://localhost:27017/my_database"  --> local mongodb server
    mongoURI: `${process.env.MONGODB_URI || "mongodb://localhost:27017"}/${process.env.DB_NAME || "my_database"}`,

  // Additional connection options for Mongoose
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
