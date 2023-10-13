'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const authenticationController = require('../../controllers/access.controller')
const { authentication } = require('../../auth/checkAuth')

const router = express.Router()


router.post('/authentication/signup', asyncHandler(authenticationController.signUp))
router.post('/authentication/login', asyncHandler(authenticationController.login))

router.use(authentication)

router.post('/authentication/logout', asyncHandler(authenticationController.logout))
router.post('/authentication/refreshToken', asyncHandler(authenticationController.handleRefreshToken))

module.exports = router