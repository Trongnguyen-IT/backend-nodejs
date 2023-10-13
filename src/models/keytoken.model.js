'use strict'

const { Schema, Types, model } = require('mongoose')

const DOCUMENT_NAME = 'Key'

const keyTokenSchema = new Schema({
    user: { type: Types.ObjectId, required: true, ref: 'Shop' },
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    refreshToken: { type: String, required: true },
    refreshTokensUsed: { type: Array, default: [] },


}, {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 }
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)