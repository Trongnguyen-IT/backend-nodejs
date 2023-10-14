const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const productService = require("../services/product.service")

class ProductController {
    async searchProduct(req, res, next) {
        const result = await productService.searchProduct(req.params)

        return new CREATED({
            message: 'Search products OK!',
            metadata: result
        }).send(res)
    }


    /**
     * @desc Get all draft
     * @param {Number} limit 
     * @param {Number} skip 
     * @param {*} next 
     * @returns 
     */
    async findAllDraftInShop(req, res, next) {
        const result = await productService.findAllDraftInShop({ product_shop: req.user.userId })

        return new CREATED({
            message: 'Get draft OK!',
            metadata: result
        }).send(res)
    }

    async findAllPublishedInShop(req, res, next) {
        const result = await productService.findAllPublishedInShop({ product_shop: req.user.userId })

        return new CREATED({
            message: 'Get published OK!',
            metadata: result
        }).send(res)
    }

    async createProduct(req, res, next) {
        const result = await productService.createProduct(req.body.product_type, {
            ...req.body,
            product_shop: req.user.userId
        })

        return new CREATED({
            message: 'Registered OK!',
            metadata: result
        }).send(res)
    }

    async publishProductInShop(req, res, next) {
        console.log('req', req);
        const result = await productService.publishProductInShop({ product_shop: req.user.userId, product_id: req.params.id })

        return new CREATED({
            message: 'Published OK!',
            metadata: result
        }).send(res)
    }


    async unPublishProductInShop(req, res, next) {
        console.log('req', req);
        const result = await productService.unPublishProductInShop({ product_shop: req.user.userId, product_id: req.params.id })

        return new CREATED({
            message: 'Un published OK!',
            metadata: result
        }).send(res)
    }
}

module.exports = new ProductController()