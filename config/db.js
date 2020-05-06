//mongoDB connection done here
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //DB config (can get whatever is in the config file)

//Connect to Mongo
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected Successfully!');
  } catch (err) {
    console.error(err.message);

    process.exit(1); //Exit process
  }
};

module.exports = connectDB;
