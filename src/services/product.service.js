'use strict'

const { BadRequestError } = require("../core/error.response")
const { product, clothing, electronic } = require("../models/product.model")

class ProductFactory {
    static productRegistry = {}

    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type]

        if (!productClass) throw new BadRequestError('Invalid type ' + type)

        return new productClass(payload).createProduct()

        // switch (type) {
        //     case 'Electronic':
        //         return new Electronic(payload)

        //     case 'Clothing':
        //         return new Clothing(payload)

        //     default:
        //         throw new BadRequestError('Invalid type ' + type)
        // }
    }
}

class Product {
    constructor({ product_name,
        product_thumb,
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
    }

    async createProduct(productId) {
        return await product.create({ ...this, _id: productId })
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({ ...this.attributes, product_shop: this.product_shop })
        if (!newClothing) throw new BadRequestError('Create clothing error')

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError('Create product error')

        return newProduct
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({ ...this.attributes, product_shop: this.product_shop })
        if (!newElectronic) throw new BadRequestError('Create electronic error')

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError('Create product error')

        return newProduct
    }
}

ProductFactory.registerProductType('Electronic', Electronic)
ProductFactory.registerProductType('Clothing', Clothing)

module.exports = ProductFactory