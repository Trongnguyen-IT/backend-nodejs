'use strict'

const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {
    async createKeyToken({ userId, publicKey, privateKey, refreshToken = [] }) {
        try {
            // const publicKeyString = publicKey.toString()
            // const token = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })
            // return token ? token.publicKey : null
            const filter = {
                user: userId
            }

            const update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }

            const options = { upsert: true, new: true }

            const token = keytokenModel.findOneAndUpdate(filter, update, options)

            return token ? token.publicKey : null

        } catch (error) {
            return error
        }
    }
}

module.exports = new KeyTokenService()