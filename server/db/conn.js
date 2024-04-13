const mongoose = require('mongoose');
const Db = process.env['ATLAS_URI'];

const connectDB = async () => {
    try {
        await mongoose.connect(Db);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.log('Connection failed :'+ err);
        throw err;
    }
}

module.exports = connectDB;