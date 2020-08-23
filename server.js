const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//Connect DB
connectDB();

//Init Middleware - enables body-parser which is default in express
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'routes', 'api', 'uploads'))
);
app.use(express.json({ extended: false })); //extended: false- allows us to use req object

//Define Routes
app.use('/api/customers', require('./routes/api/onlineCustomers'));
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/vehicles', require('./routes/api/onlineVehicles'));
app.use('/api/appointments', require('./routes/api/appointments'));
app.use('/api/inquiries', require('./routes/api/inquiries'));
app.use('/api/offers', require('./routes/api/offers'));
app.use('/api/profiles', require('./routes/api/clientProfiles'));
app.use('/api/clientProfiles', require('./routes/api/saleClientProfiles'));
app.use('/api/clientAuth', require('./routes/api/clientAuth'));
app.use('/api/staffAuth', require('./routes/api/staffAuth'));
app.use('/api/saleVehicles', require('./routes/api/saleVehicles'));
app.use('/api/reports', require('./routes/api/reports'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on Port: ${port}`));
