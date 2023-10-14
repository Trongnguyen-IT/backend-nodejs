'use strict'

const { product } = require("../product.model")

const findAllDraftInShop = async ({ query, limit, skip }) => {
    return await queryProductInShop(query, limit, skip)
}

const findAllPublishedInShop = async ({ query, limit, skip }) => {
    return await queryProductInShop(query, limit, skip)
}

const queryProductInShop = async (query, limit, skip) => {
    return await product
        .find(query)
        .populate('product_shop', 'name email -_id')
        .sort({ createAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
}


const publishProductInShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({ product_shop, _id: product_id }).lean()
    if (!foundProduct) return null

    foundProduct.isDraft = false
    foundProduct.isPublished = true
    const { modifiedCount } = await product.updateOne({ _id: product_id }, foundProduct)

    return modifiedCount
}

const unPublishProductInShop = async ({ product_shop, product_id }) => {
    const foundProduct = await product.findOne({ product_shop, _id: product_id }).lean()
    if (!foundProduct) return null

    foundProduct.isDraft = true
    foundProduct.isPublished = false
    const { modifiedCount } = await product.updateOne({ _id: product_id }, foundProduct)

    return modifiedCount
}

module.exports = {
    findAllDraftInShop,
    publishProductInShop,
    findAllPublishedInShop,
    unPublishProductInShop
}