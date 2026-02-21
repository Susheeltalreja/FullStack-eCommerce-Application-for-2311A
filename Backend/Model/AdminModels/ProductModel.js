
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductImage: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductSalePrice: {
        type: Number
    },
    ProductQuantity: {
        type: Number,
        default: 1
    },
    ProductCategory: {
        type: String,
        required: true
    },
    ProductBrand: {
        type: String,
        required: true
    },
    ProductDesc: {
        type: String
    }
})

const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;