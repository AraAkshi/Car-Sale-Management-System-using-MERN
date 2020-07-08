const AdminBro = require('admin-bro');
//mongoDB connection done here
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const db = config.get('mongoURI'); //DB config (can get whatever is in the config file)

const router = require('../dashboard/dashboard');

const app = express();

//Connect to Mongo
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.use('/admin', router);
    app.listen(8080, () =>
      console.log('AdminBro is under localhost:8080/admin')
    );

    console.log('MongoDB Connected Successfully!');
  } catch (err) {
    console.error(err.message);

    process.exit(1); //Exit process
  }
};

module.exports = connectDB;
