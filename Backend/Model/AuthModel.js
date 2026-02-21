const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    UserPassword: {
        type: String,
        required: true
    },
    UserRole : {
        type: String,
        default: "user"
    },
    UserOTP : {
        type: Number
    },
    OtpExpireTime : {
        type: Number
    },
    isVerified : {
        type: String,
        default: "pending"
    }
})

const AuthModel = mongoose.model("Register", AuthSchema);
module.exports = AuthModel;