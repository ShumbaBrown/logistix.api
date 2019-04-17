// Import dependencies
var dotenv = require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression')
var cors = require('cors')
var helmet = require('helmet')
var mongoose = require('mongoose')
var app = express()

// Connect to DB
mongoUrl = 'mongodb://localhost:27017/test?retryWrites=true'
mongoose.connect(mongoUrl, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);
var db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error.'))
db.once('open', () => console.log('Successfully connected to database.'))

// Import Routes
var billsRouter = require('./routes/bills')
var groupsRouter = require('./routes/groups')
var usersRouter = require('./routes/users')

// Security and Performance Middleware
app.use(cors())
app.use(compression())
app.use(helmet())

// Default Route
app.get('/', (req, res) => { return res.status(200).send('Logistix API')})

// Assign Routes
app.use('/bills', billsRouter)
app.use('/groups', groupsRouter)
app.use('/users', usersRouter)
app.use('/static', express.static('assets'))

// Listen for connections
app.listen(process.env.PORT, (req, res) => {
  console.log(`Logistix API is listening on host at port ${process.env.PORT}`)
})

module.exports = app
