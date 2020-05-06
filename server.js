const express = require('express')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')

const app = express()

//Body parser Middleware
//app.use(bodyParser.json());

//Connect DB
connectDB()

//Init Middleware - enables body-parser which is default in express
app.use(express.json({ extended: false })) //extended: false- allows us to use req object

//Define Routes
app.use('/api/customers', require('./routes/api/customers'))
app.use('/api/employees', require('./routes/api/employees'))
app.use('/api/vehicles', require('./routes/api/vehicles'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on Port: ${port}`))
