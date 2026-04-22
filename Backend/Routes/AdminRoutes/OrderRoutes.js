const express = require("express");

const {ShowOrders, StatusUpdate, FetchOrders} = require("../../Controllers/AdminControllers/OrdersController");

const route = express.Router();

route.get("/get-orders", ShowOrders);
route.put("/update-order/:id", StatusUpdate);
route.get("/fetch-orders/:id", FetchOrders);

module.exports = route;