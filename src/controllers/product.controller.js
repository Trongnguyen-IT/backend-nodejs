const { OK, CREATED, SuccessResponse } = require("../core/success.response")
const productService = require("../services/product.service")

class ProductController {
    async createProduct(req, res, next) {
        const result = await productService.createProduct(req.body.type, {
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