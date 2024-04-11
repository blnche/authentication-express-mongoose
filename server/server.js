const express = require('express');
const app = express();
const cors = require ('cors');

require('dotenv').config({path: './config.env'});
const port = process.env['PORT'] || 3001;

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

//DB
const dbo = require ('./db/conn');

app.listen(port, () => {
    //when server starts -> db connect
    dbo.connectToServer( (err) => {
        if (err) console.log(err);
    });
    console.log(`'Server is running on port: ${port}'`);
});