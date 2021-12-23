require('dotenv').config() // pull env variables from .env

const express = require('express');
const app = express(); // configure our server
const mongoose = require('mongoose'); 
 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) // db holds subscribers 
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
})

db.once('open', () => { // run once
    console.log('Connected to Database...');
})

app.use(express.json()); // telling server to accept json

const subscribersRouter = require ('./routes/subscribers') // point to router
                                                           
app.use('/subscribers', subscribersRouter) // localhost followed by subscribers, followed by our routes

app.listen(3000, () => {
    console.log('server started');
})