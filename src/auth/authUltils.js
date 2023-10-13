'use strict'

const jwt = require('jsonwebtoken')

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = jwt.sign(payload, publicKey, {
            //algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            //algorithm: 'RS256',
            expiresIn: '7 days'
        })

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log(`error verify`, err);
            } else {
                console.log('decode verify', decode);
            }
        })

        return { accessToken, refreshToken }

    } catch (error) {

    }
}

const verifyJWT = async (token, secretKey) => {
    return jwt.verify(token, secretKey)
}

module.exports = { createTokenPair, verifyJWT }