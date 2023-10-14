'use strict'

const { Schema, Types, model } = require('mongoose')
const  slugify  = require('slugify')

const DOCUMENT_NAME = 'Product'

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_thumb: { type: String, required: true },
    product_description: { type: String },
    product_slug: { type: String },
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: { type: String, required: true, enum: ['Electronic', 'Clothing', 'Furniture'] },
    product_shop: { type: Types.ObjectId, ref: 'Shop' },
    product_attributes: { type: Schema.Types.Mixed, required: true },
    product_ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rading must be greater than 1.0'],
        max: [5, 'Rading must be less than 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    product_variations: { type: Array, default: [] },
    isDraft: { type: Boolean, default: true, index: true, select: false },
    isPublished: { type: Boolean, default: false, index: true, select: false }
}, {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 }
})

//document middleware. run before save and create
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next()
})

const clothingShcema = new Schema({
    brand: { type: String, required: true },
    size: { type: String },
    material: { type: String }
}, {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 }
})

const electronicShcema = new Schema({
    manufacturer: { type: String, required: true },
    model: { type: String },
    color: { type: String }
}, {
    timestamps: true,
    collation: { locale: 'en_US', strength: 1 }
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('Clothing', clothingShcema),
    electronic: model('Electronic', electronicShcema)
}