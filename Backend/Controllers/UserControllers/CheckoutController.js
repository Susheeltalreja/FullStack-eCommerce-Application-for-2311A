const CheckoutModel = require("../../Model/UserModels/CheckoutModel");
const CartModel = require("../../Model/UserModels/CartModel");

const Transport = require("../../Mail/Config");

const dotenv = require("dotenv");
dotenv.config();

const Checkout = async (req, res) => {
    const { UserId, FullName, Contact, Address, City, PostalCode , Email} = req.body;
    try {
        if (!UserId || !FullName || !Contact || !Address || !City || !PostalCode) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }
        const FindCart = await CartModel.findOne({ UserId });
        if (!FindCart) {
            return res.json({
                success: false,
                message: "Cart Not found"
            })
        }
        if (FindCart.Product.length == 0) {
            return res.json({
                success: false,
                message: "Cart is empty"
            })
        }
        const NewOrder = new CheckoutModel({
            UserId, FullName, Contact, Address, City, PostalCode, Email,
            Products: FindCart.Product
        })

        await NewOrder.save();
        FindCart.Product = [];
        await FindCart.save();

        Transport.sendMail({
            from: process.env.MAIL_FROM,
            to: Email,
            subject: "New Order",
            text: "Your order placed successfully"
        })

        return res.status(200).json({
            success: true,
            message: "Your order placed successfully"
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = {Checkout}