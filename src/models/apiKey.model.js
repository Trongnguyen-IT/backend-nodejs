'use strict'

const { model, Schema, Types } = require('mongoose')

const apiKeySchema = Schema({
    key: { type: String, require: true, unique: true },
    status: { type: Boolean, default: true },
    permissions: { type: [String], require: true, enum: ['0000', '1111', '2222'] }
}, {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 }
})

module.exports = model('Apikey', apiKeySchema)
