const path = require("path")
const express = require('express')
const routes = require('../routes')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const { errorMessage } = require('../helpers/variables')
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(logger)
app.use('/api', routes)

app.get('/', (req, res) => {
    try {
      res.sendFile(path.join(__dirname + "/index.html"));
  }
  catch (error) {
      res.status(500).json({ message: errorMessage, error: error.message })
  }
 });

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl}`)
    next();
}


module.exports = app