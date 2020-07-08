const express = require('express');
const connectDB = require('./config/db');
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
app.use('/api/clientAuth', require('./routes/api/clientAuth'));
app.use('/api/staffAuth', require('./routes/api/staffAuth'));
//app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));
