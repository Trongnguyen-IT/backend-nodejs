'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const roleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

module.exports = class AuthService {
    async signUp(name, email, password) {
        try {
            //check email exist
            const existModel = shopModel.findOne({ email }).lean()

            if (existModel) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered.'
                }
            }
            const passwordHash = await bcrypt.hashSync(password, 10)

            const newShop = await shopModel.create({
                name,
                email,
                passwordHash,
                rolse: [roleShop.SHOP]
            })

            if (newShop) {
                const { privateKey, publicKey } =crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096
                })
            }

        } catch (error) {
            console.log('error', error);
        }
    }
}

