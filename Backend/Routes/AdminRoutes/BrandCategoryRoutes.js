const express = require("express");

const {CreateCategory, FetchCategory, UpdateCategory, DeleteCategory,SearchCategory, CreateBrand, FetchBrand, UpdateBrand, DeleteBrand, SearchBrand} = require("../../Controllers/AdminControllers/BrandCartegoryController")

const {AdminMiddleware} = require("../../MiddleWare/AdminMiddleware");
const route = express.Router();

//Category routes
route.post("/add-category",AdminMiddleware, CreateCategory);
route.get("/get-category", FetchCategory);
route.put("/update-category/:id",AdminMiddleware, UpdateCategory);
route.delete("/delete-category/:id",AdminMiddleware, DeleteCategory);
route.get("/search-category/:name",AdminMiddleware, SearchCategory);

//Brand Routes
route.post("/add-brand",AdminMiddleware, CreateBrand);
route.get("/get-brand", FetchBrand);
route.put("/update-brand/:id",AdminMiddleware, UpdateBrand);
route.delete("/delete-brand/:id",AdminMiddleware, DeleteBrand);
route.get("/search-brand/:name",AdminMiddleware, SearchBrand);

module.exports = route;