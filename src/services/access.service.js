'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const keyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUltils')
const { getDataInfo } = require('../ultils/getDataInfo')
const { BadRequestError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    async login({ email, password, refreshToken = null }) {
        const existShop = await findByEmail({ email })

        if (!existShop) {
            throw new BadRequestError('Shop is not register')
        }
        const match = await bcrypt.compare(password, existShop.password)
        
        if (!match) {
            throw new BadRequestError('Password is incorrect!')
        }

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const tokens = await createTokenPair(
            {
                userId: existShop._id,
                email: existShop.email
            }, publicKey, privateKey)

        //const publicKeyString = await keyTokenService.createKeyToken(newShop._id, publicKey, privateKey)
        const keyStore = await keyTokenService.createKeyToken(
            {
                userId: existShop._id,
                publicKey,
                privateKey,
                refreshToken: tokens.refreshToken
            })

        return {
            shop: getDataInfo(['name', 'email', 'phoneNumber'], existShop),
            tokens: tokens
        }
    }

    async signUp({ name, email, password, phoneNumber }) {
        //check email exist
        const existModel = await shopModel.findOne({ email }).lean()

        if (existModel) {
            throw new BadRequestError('Shop is registered!')
        }

        const passwordHash = await bcrypt.hashSync(password, 10)

        const newShop = await shopModel.create({
            name,
            email,
            password: passwordHash,
            phoneNumber,
            roles: [roleShop.SHOP]
        })

        if (newShop) {
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })

            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            //const publicKeyString = await keyTokenService.createKeyToken(newShop._id, publicKey, privateKey)
            const keyStore = await keyTokenService.createKeyToken(newShop._id, publicKey, privateKey)

            if (!keyStore) {
                throw new BadRequestError('Public key error!')
            }

            //const publicKeyObject = crypto.createPublicKey(publicKeyString)

            const tokens = await createTokenPair(
                {
                    userId: newShop._id,
                    email: newShop.email
                }, publicKey, privateKey)

            return {
                code: 201,
                metadata: {
                    shop: getDataInfo(['name', 'email', 'phoneNumber'], newShop),
                    tokens: tokens
                }
            }
        }

        return {
            code: 200,
            metadata: null
        }
    }
}

module.exports = new AccessService()

