'use strict'

const express = require('express')
const asyncHandler = require('../../helpers/asyncHandler')
const productController = require('../../controllers/product.controller')
const { authentication } = require('../../auth/checkAuth')

const router = express.Router()

router.use(authentication)

router.post('/create', asyncHandler(productController.createProduct))
router.post('/publish/:id', asyncHandler(productController.publishProductInShop))
router.post('/un-publish/:id', asyncHandler(productController.unPublishProductInShop))
router.get('/draft/all', asyncHandler(productController.findAllDraftInShop))
router.get('/published/all', asyncHandler(productController.findAllPublishedInShop))

module.exports = router