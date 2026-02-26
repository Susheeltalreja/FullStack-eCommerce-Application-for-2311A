const express = require('express');

const {GenerateImageResponse, AddProduct, fetchProducts, UpdateProducts, DeleteProduct} = require("../../Controllers/AdminControllers/ProductController");

//multer storage
const ProductUploads = require('../../Multer/ProductStorage');

const route = express.Router();

route.post('/upload', ProductUploads.single("ProductImage"), GenerateImageResponse)
route.post("/add-product", AddProduct);
route.get("/get-product", fetchProducts);
route.put("/update-product/:id", UpdateProducts);
route.delete("/delete-product/:id", DeleteProduct)

module.exports = route