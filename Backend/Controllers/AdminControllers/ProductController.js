
const ProductModel = require("../../Model/AdminModels/ProductModel");

const fs = require('fs');
const path = require("path")

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

const UpdateProducts = async (req, res) => {
    const { ProductImage, ProductName, ProductPrice, ProductSalePrice, ProductQuantity, ProductCategory, ProductBrand, ProductDesc } = req.body;
    try {

        const ProductId = req.params.id;
        const FindProduct = await ProductModel.findOne({_id: ProductId})
        if(!FindProduct){
            return res.json({
                success: false,
                message: "Product not found"
            })
        }
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

        if(ProductImage !== FindProduct.ProductImage){
            const Address = path.join("Uploads/", FindProduct.ProductImage)
            if(fs.existsSync(Address)){
                fs.unlinkSync(Address)
            }
        }

        FindProduct.ProductName = ProductName;
        FindProduct.ProductImage = ProductImage;
        FindProduct.ProductPrice = ProductPrice;
        FindProduct.ProductSalePrice = ProductSalePrice;
        FindProduct.ProductQuantity = ProductQuantity;
        FindProduct.ProductCategory = ProductCategory;
        FindProduct.ProductBrand = ProductBrand;
        FindProduct.ProductDesc = ProductDesc;
        await FindProduct.save();
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = { GenerateImageResponse, AddProduct, fetchProducts, UpdateProducts };