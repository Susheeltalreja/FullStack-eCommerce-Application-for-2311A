const express = require("express");

const {ShowOrders, StatusUpdate} = require("../../Controllers/AdminControllers/OrdersController");

const route = express.Router();

route.get("/get-orders", ShowOrders);
route.put("/update-order/:id", StatusUpdate);

module.exports = route;