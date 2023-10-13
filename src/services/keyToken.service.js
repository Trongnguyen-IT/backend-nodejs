'use strict'

const { Types } = require("mongoose")
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
            }, update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            }, options = { upsert: true, new: true }

            const token = await keytokenModel.findOneAndUpdate(filter, update, options)

            return token ? token.publicKey : null

        } catch (error) {
            return error
        }
    }

    async findByUserId(userId) {
        return await keytokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
    }

    async removeKeyById(id) {
        return await keytokenModel.deleteOne(id)
    }

    async findByRefreshTokenUsed(refreshToken) {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    }

    async findByRefreshToken({ refreshToken }) {
        return await keytokenModel.findOne({ refreshToken })
    }

    async deleteKeyByUserId(userId) {
        return await keytokenModel.findByIdAndDelete({ user: userId }).lean()
    }
}

module.exports = new KeyTokenService()