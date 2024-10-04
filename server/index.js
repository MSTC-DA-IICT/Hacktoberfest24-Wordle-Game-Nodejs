// Importing required modules
const http = require('http');
import { generate, count } from "random-words";
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import fs from 'node:fs';
const app = express();
const server = http.createServer(app);
dotenv.config({path: './config/config.env'});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
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
app.get('/random',(req,res)=>{
    fs.readFile('sample.txt', 'utf8', (err, data) => { 
        if (err) {
          return err;
        }
        else{
        const words=data.split(/\s+/);
        const randomnum=Math.floor(Math.random()*words.length)
        const randomword=words[randomnum]
        res.send(randomword)
    }
      });
    
})
// Routes
const loginRoute = require('./routes/login_route.js');
app.use('/login', loginRoute);

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

// Starting the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});