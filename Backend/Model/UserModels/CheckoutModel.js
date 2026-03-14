const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    FullName: {
        type: String, 
        required: true
    },
    Contact: {
        type: String, 
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    PostalCode: {
        type: Number,
        required: true
    },
    LandMark: {
        type: String,
        required: true
    },
    DeliverInst: {
        type: String
    },
    Products: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Products"
            },
            Quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, {timestamps: true})

const CheckoutModel = mongoose.model("Checkout", CheckoutSchema);
module.exports = CheckoutModel;