const express = require('express');
const app = express();
const cors = require ('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

require('dotenv').config({path: './config.env'});
const connectDB = require ('./db/conn');
const port = process.env['PORT'] || 3001;

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use('/auth', authRoutes);

// USER ROUTES
app.use('/user', userRoutes);

// START SERVER & CONNECT TO DB
app.listen(port, () => {
    // CONNECT TO DB
    connectDB();
    console.log(`'Server is running on port: ${port}'`);
});