const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser=require('body-parser');


mongoose.connect("mongodb://localhost:27017/mydatabase")
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


//app.use(express.json());
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(routes);


app.listen(5000, () => {
    console.log(`Server Started at 5000`)
});