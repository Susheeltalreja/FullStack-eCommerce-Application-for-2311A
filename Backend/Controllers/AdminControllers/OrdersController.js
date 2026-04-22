const CheckoutModel = require("../../Model/UserModels/CheckoutModel");

const Transport = require("../../Mail/Config");

const dotenv = require("dotenv");
dotenv.config();

const ShowOrders = async (req, res) => {
    try {
        const AllOrders = await CheckoutModel.find().populate("Products.ProductId");
        return res.status(200).json({
            success: true,
            Data: AllOrders
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const StatusUpdate = async (req, res) => {
    const {Status} = req.body;
    try {
        const OrderId = req.params.id;
        const FindOrder = await CheckoutModel.findOne({_id: OrderId});
        if(!FindOrder){
            return res.json({
                success: false,
                message: "Order not found"
            })
        }
        FindOrder.Status = Status;
        await FindOrder.save();
        Transport.sendMail({
            from: process.env.MAIL_FROM,
            to: FindOrder.Email,
            subject: "Status Updated of your order",
            text: `Status of your order: ${Status}`
        })
        return res.status(200).json({
            success: true,
            message: "Status updated successfully"
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const FetchOrders = async (req, res) => {
    try {
        const UserId = req.params.id
        const AllOrders = await CheckoutModel.find({UserId}).populate("Products.ProductId");
        return res.status(200).json({
            success: true,  
            Data: AllOrders
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = { ShowOrders, StatusUpdate, FetchOrders };