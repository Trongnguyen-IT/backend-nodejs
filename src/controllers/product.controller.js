const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const productService = require("../services/product.service")

class ProductController {
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
}

module.exports = new ProductController()