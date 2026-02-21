const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;