
const ProductModel = require("../../Model/AdminModels/ProductModel");

const ReadProducts = async (req, res) => {
    const { Brand = [], Category = [], SortBy = "z to a" } = req.query;
    try {
        let Filters = {
        };

        if (Brand.length > 0) {
            Filters.ProductBrand = { $in: Brand.split(",") }
        }
        
        if (Category.length > 0) {
            Filters.ProductCategory = { $in: Category.split(",") }
        }

        let sort = {
        }

        switch(SortBy){
            case "a to z":
                sort.ProductName = 1;
                break;
            case "z to a":
                sort.ProductName = -1;
                break;
            case "price low to high":
                sort.ProductPrice = 1;
                break;
            case "price high to low":
                sort.ProductPrice = -1;
                break;
        }

        const Products = await ProductModel.find(Filters).sort(sort);
        return res.status(200).json({
            success: true,
            Data: Products
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server issue"
        })
    }
}

module.exports = {ReadProducts}