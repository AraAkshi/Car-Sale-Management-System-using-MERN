const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//Body parser Middleware
app.use(bodyParser.json());

//DB config
//const db = require('./config/default').mongoURI;

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));
