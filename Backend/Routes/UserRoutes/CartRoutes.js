const express = require("express");

const {AddToCart, FetchCart, IncreaseQuantity, DecreaseQuantity, RemoveQuantity} = require("../../Controllers/UserControllers/CartController");

const route = express.Router();

route.post("/add", AddToCart)
route.get("/fetch-cart/:id", FetchCart)
route.post("/increase", IncreaseQuantity)
route.post('/decrease', DecreaseQuantity)
route.delete('/remove', RemoveQuantity)
module.exports = route;