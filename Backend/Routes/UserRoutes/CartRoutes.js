const express = require("express");

const {AddToCart} = require("../../Controllers/UserControllers/CartController");

const route = express.Router();

route.post("/add", AddToCart)

module.exports = route;