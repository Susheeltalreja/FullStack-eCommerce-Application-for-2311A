//Import the model
const CategoryModel = require("../../Model/AdminModels/CategoryModel");
const BrandModel = require("../../Model/AdminModels/BrandModel");

//Category Methods
const CreateCategory = async (req, res) => {
    const { CategoryName } = req.body;
    try {
        if (!CategoryName) {
            return res.json({
                success: false,
                message: "Input field are required"
            })
        }
        const FindCategory = await CategoryModel.findOne({ CategoryName })
        if (FindCategory) {
            return res.json({
                success: false,
                message: "Category is already available"
            })
        }
        const NewCategory = await CategoryModel({
            CategoryName
        })
        await NewCategory.save();
        return res.status(200).json({
            success: true,
            message: "Category added successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const FetchCategory = async (req, res) => {
    try {
        const GetCategories = await CategoryModel.find();
        return res.status(200).json({
            success: true,
            data: GetCategories
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const UpdateCategory = async (req, res) => {
    const { CategoryName } = req.body;
    try {
        const CategoryId = req.params.id;
        const FindCategory = await CategoryModel.findOne({ CategoryName })
        if (FindCategory) {
            return res.json({
                success: false,
                message: "Category is already available"
            })
        }
        const UpdateCategory = await CategoryModel.findByIdAndUpdate(CategoryId, req.body);
        await UpdateCategory.save();
        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const DeleteCategory = async (req, res) => {
    try {
        const CategoryId = req.params.id;
        await CategoryModel.findByIdAndDelete(CategoryId);
        return res.status(200).json({
            success: true,
            message: "Category Deleted successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const SearchCategory = async (req, res) => {
    try {
        const Name = req.params.name;
        const Categories = await CategoryModel.find({CategoryName: {$regex: Name, $options: "i"}});

        if(Categories.length === 0){
            return res.json({
                success: false,
                message: "No category found"
            })
        }

        res.status(200).json({
            success: true,
            Categories
        })

    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}

//Brand Methods
const CreateBrand = async (req, res) => {
    const { BrandName } = req.body;
    try {
        if (!BrandName) {
            return res.json({
                success: false,
                message: "Input field are required"
            })
        }
        const FindBrand = await BrandModel.findOne({ BrandName })
        if (FindBrand) {
            return res.json({
                success: false,
                message: "Brand is already available"
            })
        }
        const NewBrand = await BrandModel({
            BrandName
        })
        await NewBrand.save();
        return res.status(200).json({
            success: true,
            message: "Brand added successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const FetchBrand = async (req, res) => {
    try {
        const GetBrand = await BrandModel.find();
        return res.status(200).json({
            success: true,
            data: GetBrand
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const UpdateBrand = async (req, res) => {
    const { BrandName } = req.body;
    try {
        const BrandId = req.params.id;

        const FindBrand = await BrandModel.findOne({ BrandName });
        if (FindBrand) {
            return res.json({
                success: false,
                message: "Brand is already available"
            })
        }

        const UpdateBrand = await BrandModel.findByIdAndUpdate(BrandId, req.body);
        await UpdateBrand.save();
        return res.status(200).json({
            success: true,
            message: "Brand Updated Successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const DeleteBrand = async (req, res) => {
    try {
        const BrandId = req.params.id;
        await BrandModel.findByIdAndDelete(BrandId);
        return res.status(200).json({
            success: true,
            message: "Brand Deleted successfully"
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}
const SearchBrand = async (req, res) => {
    try {
        const Name = req.params.name;

        const FindBrand = await BrandModel.find({ BrandName: { $regex: Name, $options: "i" } });

        if (FindBrand.length === 0) {
            return res.json({
                success: false,
                message: "No Brand Found"
            })
        }
        res.status(200).json({
            success: true,
            FindBrand
        })
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(500).json({
            success: false,
            message: "Server Issue"
        })
    }
}

module.exports = { CreateCategory, FetchCategory, UpdateCategory, DeleteCategory,SearchCategory, CreateBrand, FetchBrand, UpdateBrand, DeleteBrand, SearchBrand }