// import modules
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// import utils
import connectDB from './config/database.js';

// port listener with hidden port variable in .env
const port = process.env.PORT || 3000;

// call database
connectDB();

// express app
const app = express();          

// set middleware to read json files in request
app.use(express.json());                            // parse json in request
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// route handler
app.get("/", (req, res) => {
    res.send('Hello World')
});

// port listener
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));