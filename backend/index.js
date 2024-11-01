// import modules
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// import utils
import connectDB from './config/database.js';

// port listener
dotenv.config();

// call database
connectDB();

// call function
const app = express();          
app.use(express.json());        // set middleware to read json files in request
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send('Hello World')
});

// port listener
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on PORT: ${port}`));

