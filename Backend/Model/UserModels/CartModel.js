const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: true
    },
    Product: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            Quantity: {
                type: Number,
                min: 1
            }
        }
    ]
})

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;