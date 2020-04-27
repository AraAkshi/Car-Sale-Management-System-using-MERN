//mongoDB connection done here
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //DB config

//Connect to Mongo
mongoose
  .connect(db) //gives back a promise
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log(`Connection failed: ${err}`));
