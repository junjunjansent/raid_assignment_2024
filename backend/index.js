// import modules
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

// import database
import connectDB from './config/database.js';

// import routes
import user_Routes from './routers/user_Routes.js'
import product_Routes from './routers/product_Routes.js'
import order_Routes from './routers/order_Routes.js'
import upload_Routes from './routers/upload_Routes.js'

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

// go to route handler
app.use("/api/user", user_Routes);
app.use("/api/product", product_Routes);
app.use("/api/order", order_Routes);
app.use('/api/upload_image', upload_Routes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get("/", (req, res) => {
    res.send('Hello World');
});

// port listener
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));