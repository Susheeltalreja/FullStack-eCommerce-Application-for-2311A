const express = require('express');
const mongoose = require('mongoose');

//Dotenv config
const dotenv = require('dotenv');
dotenv.config();

//CORS
const cors = require('cors');
//Cookie parser for understanding the cookie in backend
const cookieParser = require('cookie-parser');
//AuthRouting
const AuthRoutes = require("./Routes/AuthRoutes");
//AdminRoutes
const BrandCategoryRoute = require('./Routes/AdminRoutes/BrandCategoryRoutes');
const ProductRoutes = require("./Routes/AdminRoutes/ProductRoutes");

//UserRoutes
const UserProductRoutes = require("./Routes/UserRoutes/ProductRoutes");
const CartRoutes = require("./Routes/UserRoutes/CartRoutes");
const CheckoutRoutes = require("./Routes/UserRoutes/CheckoutRoutes");

mongoose.connect(process.env.MONGOOSE_URL)
.then(() => console.log("Mongoose Connected succesffully"))
.catch((e) => console.log(`Error: ${e}`));


const app = express();
const Port = process.env.PORT;

app.use(express.json());
// use cookie parser
app.use(cookieParser());
//Image folder
app.use("/uploads", express.static("Uploads"))

app.use(cors(
    {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
))

app.use("/auth", AuthRoutes);
app.use("/cb", BrandCategoryRoute);
app.use("/product", ProductRoutes);
app.use("/user/product", UserProductRoutes);
app.use("/user/cart", CartRoutes)
app.use("/user/checkout", CheckoutRoutes);

app.listen(Port, console.log(`server is listen on ${Port}`));

