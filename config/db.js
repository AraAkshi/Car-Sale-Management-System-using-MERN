const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const db = config.get('mongoURI'); //DB config (can get whatever is in the config file)

const app = express();

//Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected Successfully!');
  } catch (err) {
    console.error(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
