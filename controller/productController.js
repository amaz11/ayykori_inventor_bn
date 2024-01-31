const { productModel } = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncs");


//createProduct --- admin
module.exports.createProduct = catchAsyncError(async (req, res) => {
    req.body.user = req.user._id;
    const product = await productModel.create(req.body);
    return res.status(201).json({
        success: true,
        product,
    });
});

module.exports.getProducts = catchAsyncError(async (req, res) => {
    const products = await productModel.find()
    return res.status(200).json({
        success: true,
        products,
    });
});

module.exports.getProductById = catchAsyncError(async (req, res, next) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
        success: true,
        product,
    });
});

//updateProductById ---admin
module.exports.updateProductById = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false,
    });
    return res.status(200).json({
        success: true,
        product,
    });
});

//deleteProductById ---admin
module.exports.deleteProductById = catchAsyncError(async (req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    product = await productModel.findByIdAndDelete(req.params.id);
    return res.status(204).json({
        success: true,
        message: "Product Deleted",
    });
});