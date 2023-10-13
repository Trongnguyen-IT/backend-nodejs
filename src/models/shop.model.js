'use strict'

//const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Shop'

const shopSchema = new mongoose.Schema({
    name: { type: String, trim: true, maxLength: 150 },
    email: { type: String, trim: true, unique: true },
    phoneNumber: { type: String, default: '' },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    verify: { type: mongoose.Schema.Types.Boolean, default: false },
    roles: { type: Array, default: [] }
},
    {
        timestamps: true,
        collation: { locale: 'en_US', strength: 1 }
    })

module.exports = mongoose.model(DOCUMENT_NAME, shopSchema)