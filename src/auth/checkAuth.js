'use strict'
const jwt = require('jsonwebtoken')
const { BadRequestError, NotFoundError, AuthFailureError } = require('../core/error.response')
const asyncHandler = require('../helpers/asyncHandler')
const { findById } = require('../services/apiKey.service')
const keyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    CLIENT_ID: 'x-client-id',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()

        if (!key) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }

        const objKey = await findById(key)

        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }

        req.objKey = objKey
        return next()
    } catch (error) {

    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                message: 'Access denied'
            })
        }

        return next()
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    /*
    1 check clientid missing
    2 get access token
    3 verify token
    4 check user in db
    5 check keystore with userid
    6 ok all next()
    */
    // 1
    const userId = req.headers[HEADER.CLIENT_ID]

    if (!userId) {
        throw new AuthFailureError('Invalid request')
    }

    //2
    const keyStore = await keyTokenService.findByUserId(userId)

    if (!keyStore) throw new NotFoundError('Not found keystore')

    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError('Invalid token')

    //4
    try {

        const decodeUser = jwt.verify(accessToken, keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid user')

        req.keyStore = keyStore

        return next()
    } catch (error) {
        throw error
    }
})

module.exports = {
    apiKey,
    permission,
    authentication
}