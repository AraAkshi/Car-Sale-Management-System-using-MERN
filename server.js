const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
//const bodyParser = require('body-parser');
const app = express();

//Connect DB
connectDB();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

//Init Middleware - enables body-parser which is default in express
app.use(express.json({ extended: false })); //extended: false- allows us to use req object

//Define Routes
app.use('/api/customers', require('./routes/api/customers'));
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/vehicles', require('./routes/api/vehicles'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/inquiries', require('./routes/api/inquiries'));
app.use('/api/offers', require('./routes/api/offers'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/clientAuth', require('./routes/api/clientAuth'));
app.use('/api/staffAuth', require('./routes/api/staffAuth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));
