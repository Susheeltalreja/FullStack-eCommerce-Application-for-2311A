const CartModel = require("../../Model/UserModels/CartModel");
const ProductModel = require("../../Model/AdminModels/ProductModel");
const UserModel = require("../../Model/AuthModel");

// Add to cart

const AddToCart = async (req, res) => {
    const { UserId, ProductId, Quantity } = req.body;
    try {
        const FindUser = await UserModel.findById(UserId);
        if (!FindUser) {
            return res.status(404).json({
                success: false,
                message: "You need to registered first"
            })
        }

        const FindProduct = await ProductModel.findById(ProductId);
        if (!FindProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        const FindCart = await CartModel.findOne({ UserId });
        if (FindCart) {
            const FindIndex = FindCart.Product.findIndex(Item => Item.ProductId.toString() === ProductId)
            if (FindIndex > -1) {
                FindCart.Product[FindIndex].Quantity += Quantity
            } else {
                FindCart.Product.push({ ProductId, Quantity })
            }
            await FindCart.save();
        } else {
            const NewItem = new CartModel({
                UserId,
                Product: [{ ProductId, Quantity }]
            })

            await NewItem.save();
        }

        return res.status(200).json({
            success: true,
            message: "product added to cart successfully"
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const FetchCart = async (req, res) => {
    try {
        const UserId = req.params.id;
        const FindCart = await CartModel.findOne({ UserId }).populate("Product.ProductId");
        return res.status(200).json({
            success: true,
            Data: FindCart
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const IncreaseQuantity = async (req, res) => {

    const { UserId, ProductId } = req.body;

    try {
        const findCart = await CartModel.findOne({ UserId });
        if (!findCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }
        const FindIndex = findCart.Product.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            findCart.Product[FindIndex].Quantity += 1;
        }
        await findCart.save();

        return res.status(200).json({
            success: true
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}
const DecreaseQuantity = async (req, res) => {

    const { UserId, ProductId } = req.body;

    try {
        const findCart = await CartModel.findOne({ UserId });
        if (!findCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }

        const FindIndex = findCart.Product.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            if (findCart.Product[FindIndex].Quantity > 1) {
                findCart.Product[FindIndex].Quantity -= 1;
            }
        }
        await findCart.save();
        return res.status(200).json({
            success: true
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}
const RemoveQuantity = async (req, res) => {

    const { UserId, ProductId } = req.body;

    try {
        const findCart = await CartModel.findOne({ UserId });
        if (!findCart) {
            return res.json({
                success: false,
                message: "Cart not found"
            })
        }

        const FindIndex = findCart.Product.findIndex(item => item.ProductId.toString() === ProductId);
        if (FindIndex > -1) {
            findCart.Product.splice(FindIndex, 1)
        }

        await findCart.save();

        return res.status(200).json({
            success: true
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}



module.exports = { AddToCart, FetchCart, IncreaseQuantity, DecreaseQuantity, RemoveQuantity }