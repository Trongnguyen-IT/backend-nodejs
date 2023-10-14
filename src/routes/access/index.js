'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const authenticationController = require('../../controllers/access.controller')
const { authentication } = require('../../auth/checkAuth')

const router = express.Router()


router.post('/signup', asyncHandler(authenticationController.signUp))
router.post('/login', asyncHandler(authenticationController.login))

router.use(authentication)

router.post('/logout', asyncHandler(authenticationController.logout))
router.post('/refreshToken', asyncHandler(authenticationController.handleRefreshToken))

module.exports = router