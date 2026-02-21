
const ProductModel = require("../../Model/AdminModels/ProductModel");

const GenerateImageResponse = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file provided"
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            address: `ProductImages/${req?.file?.filename}`
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: 'Server issue'
        })
    }
}


const AddProduct = async (req, res) => {
    const { ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductCategory, ProductBrand, ProductDesc } = req.body;
    try {
        if (!ProductImage || !ProductName || !ProductPrice || !ProductQuantity || !ProductCategory || !ProductBrand) {
            return res.json({
                success: false,
                message: "All Input fields are required"
            })
        }
        const price = Number(ProductPrice);
        const sprice = Number(ProductSalePrice);
        if (sprice && sprice > price) {
            return res.json({
                success: false,
                message: "Sale price should be lesser than price"
            })
        }
        const NewProduct = new ProductModel({
            ProductImage,
            ProductName,
            ProductPrice,
            ProductSalePrice,
            ProductQuantity,
            ProductCategory,
            ProductBrand,
            ProductDesc
        })
        await NewProduct.save();
        return res.status(200).json({
            success: true,
            message: "Product uploaded successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

const fetchProducts = async (req, res) => {
    try {
        const AllProducts = await ProductModel.find();
        return res.status(200).json({
            success: true,
            data: AllProducts
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = { GenerateImageResponse, AddProduct, fetchProducts };