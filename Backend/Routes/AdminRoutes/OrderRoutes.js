const express = require("express");

const {ShowOrders} = require("../../Controllers/AdminControllers/OrdersController");

const route = express.Router();

route.get("/get-orders", ShowOrders);

module.exports = route;