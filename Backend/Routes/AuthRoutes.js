const express = require("express");
const {RegisterUser, LoginUser, logoutUser, OtpVerfication, RegenrateOTP, CheckUser, forgetPassword} = require("../Controllers/AuthController");
const { AuthMiddleWare } = require("../MiddleWare/AuthMiddleware");

const route = express.Router();

route.post("/register", RegisterUser);
route.post("/login", LoginUser);

route.get("/return", AuthMiddleWare, (req, res) => {
    const UserData = req.User;
    return res.status(200).json({
        success: true,
        UserData
    })
})

route.post("/logout", logoutUser);
route.post("/otp-verify", OtpVerfication);
route.post("/regenrate-otp", RegenrateOTP);
route.post("/check-user/:email", CheckUser);
route.put("/update", forgetPassword);

module.exports = route;