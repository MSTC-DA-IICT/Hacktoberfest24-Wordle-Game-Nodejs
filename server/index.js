const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const wordRoute = require('./routes/word_route.js');
const loginRoute = require('./routes/login_route.js');
const socketUtils = require('./utils/socket-utils.js');

dotenv.config({
    path: "./config.env",
});

const app = express();
const server = http.createServer(app);
const io = socketUtils.sio(server);
socketUtils.connection(io);

const socketIOMiddleware = (req, res, next) => {
    req.io = io;
    next();
};

// CORS
app.use(cors());

// Importing additional middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to the database
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // * means all
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // * means all
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // * means all
        return res.status(200).json({});
    }
    next();
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Wordle Game Home Page');
});

// Routes
const loginRoute = require('./routes/login_route.js');
const gameRoute = require('./routes/game_route.js');

app.use('/login', loginRoute);
app.use('/game', gameRoute);

// Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Additional route with socket.io middleware
app.use("/api/v1/hello", socketIOMiddleware, (req, res) => {
    req.io.emit("message", `Hello, ${req.originalUrl}`);
    res.send("hello world!");
});

// Starting the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
