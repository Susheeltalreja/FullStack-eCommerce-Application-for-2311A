const express = require("express");

const {ReadProducts} = require("../../Controllers/UserControllers/ProductController");

const route = express.Router();

route.get("/fetch-product", ReadProducts)

module.exports = route;