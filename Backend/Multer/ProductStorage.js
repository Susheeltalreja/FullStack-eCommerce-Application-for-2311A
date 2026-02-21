
const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Uploads/ProductImages")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const ProductUploads = multer({ storage: Storage })

module.exports = ProductUploads