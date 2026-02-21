const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    BrandName : {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const BrandModel = mongoose.model("Brands", BrandSchema);

module.exports = BrandModel;