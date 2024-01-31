const { default: mongoose } = require("mongoose");
const catchAsyncs = require("../middleware/catchAsyncs");
const { orderModel } = require("../model/OrderModel");
var uniqid = require('uniqid');
const { productModel } = require("../model/productModel");
const ErrorHandler = require("../utils/ErrorHandler");

const calculateOrderTotalAmount = (items) => {
    const totalPrice = items.reduce((acc, item) => {
        return (+acc) + (item.price * item.quantity)
    }, 0)
    return totalPrice
}
const newOrder = catchAsyncs(async (req, res, next) => {
    const skuNeno = uniqid()
    const {
        shippingInfo,
        orderItem
    } = req.body;

    const productId = orderItem.map(item => item.productId);

    const product = await productModel.find({
        _id: { $in: productId }
    })

    const item = await orderItem.map(item => {
        const newItem = product.find(itemProduct => item.productId === itemProduct.id)
        return { ...item, price: newItem?.price }
    })


    const totalAmount = calculateOrderTotalAmount(item)
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
        try {
            await orderModel.create([{
                sku: skuNeno,
                shippingInfo,
                orderItem,
                totalAmount,
                user: req.user._id
            }], { session: session })
            await productModel.updateMany(
                {
                    $or: orderItem.map(item => ({
                        _id: item.productId,
                    }
                    )
                    )
                },
                { $inc: { stock: -1 * orderItem.map(item => item.quantity) } },
            ).session(session).exec()
        } catch (error) {
            console.log(error);
            return next(new ErrorHandler("Transaction Incomplete", 404));
        }
    });
    await session.endSession()

    // try {

    //     await orderModel.create([{
    //         sku: skuNeno,
    //         shippingInfo,
    //         orderItem,
    //         totalAmount,
    //         user: req.user._id
    //     }], { session: session })
    //     await productModel.updateMany(
    //         {
    //             $or: orderItem.map(item => ({
    //                 _id: item.productId,
    //                 stock: { $gte: item.quantity }
    //             }
    //             )
    //             )
    //         },
    //         { $inc: { stock: -1 * orderItem.map(item => item.quantity) } },
    //     ).session(session)
    //     await session.commitTransaction()
    // } catch (error) {
    //     await session.abortTransaction()
    //     console.log(error);
    //     return next(new ErrorHandler("Transaction Incomplete", 404));
    // } finally {
    //     session.endSession()
    // }
    return res.json({ message: "Yoiu can Do it! Inn-shallah" })
})

module.exports = { newOrder }