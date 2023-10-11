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

//init db
require('./dbs/init.mongodb')
//const {checkOverload}  = require('./helpers/check.connect')
//checkOverload()

//init route
app.use('/', routes)

//handle error

module.exports = app
