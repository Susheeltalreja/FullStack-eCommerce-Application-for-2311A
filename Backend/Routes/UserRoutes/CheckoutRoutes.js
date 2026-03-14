const express = require("express");

const {Checkout} = require("../../Controllers/UserControllers/CheckoutController");

const route = express.Router();

route.post("/final", Checkout);

module.exports = route;