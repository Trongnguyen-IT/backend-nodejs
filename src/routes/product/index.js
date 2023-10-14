'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const productController = require('../../controllers/product.controller')
const { authentication } = require('../../auth/checkAuth')

const router = express.Router()

//router.use(authentication)

router.post('/create', asyncHandler(productController.createProduct))
router.get('/draftAll', asyncHandler(productController.findAllDraftInShop))

module.exports = router