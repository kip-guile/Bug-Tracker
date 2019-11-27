const express = require('express')
const routes = require('../routes')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(logger)
app.use('/api', routes)

app.get('/', (req, res) => {
    res.status(200).send(`
     BUG TRACKER SERVICES! WHATS YOUR EMERGENCY?
    `);
  });

function logger(req, res, next) {
    console.log(`${req.method} to ${req.originalUrl}`)
    next();
}


module.exports = app