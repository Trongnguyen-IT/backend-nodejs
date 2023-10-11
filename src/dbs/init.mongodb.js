'use strict'

const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')
const config = require('../configs/config.mongo')

class DbContext {

    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (process.env.NOVE_ENV === 'dev') {
            mongoose.set('debug', true, { color: true })
        }

        mongoose.connect(config.db.connectionString)
            .then(() => {
                console.log('Connected mongo db.')

            }).catch(err => {
                console.log('Failure', err);
            });
    }

    static getInstance() {
        if (!DbContext.instance) {
            DbContext.instance = new DbContext()
        }

        return DbContext.instance
    }
}

const instanceMongoDb = DbContext.getInstance()

module.exports = instanceMongoDb
