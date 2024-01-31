const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const orderSchema = new Schema({
    sku: {
        type: String,
        required: true,
    },
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
        },
    },
    orderItem: [{
        productId: {
            type: ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
})

const orderModel = model("order", orderSchema);

module.exports.orderModel = orderModel;