const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
var morgan = require('morgan')

const app = new express()

//init middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//init db

//init route
app.get('/', (req, res) => {
    return res.status(200).json({ title: 'trong'})
})

//handle error

module.exports = app
