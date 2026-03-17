const CheckoutModel = require("../../Model/UserModels/CheckoutModel");

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

module.exports = {ShowOrders};