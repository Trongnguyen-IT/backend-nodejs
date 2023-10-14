require('dotenv').config();
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const routes = require('./routes')

const app = new express()

//init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// parse application/json
app.use(express.json());

//init db
require('./dbs/init.mongodb')
//const {checkOverload}  = require('./helpers/check.connect')
//checkOverload()

//init route
app.use('/', routes)

//handle error
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500
    return res.status(errorStatus).json({
        status: 'error',
        code: errorStatus,
        stack: error.stack,
        message: error.message || 'Internal server error'
    })
})


module.exports = app
