const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Product Name"],
            maxlength: [20, "Description can not more than 20 words"],
            trim: true,
        },
        description: {
            type: String,
            maxlength: [4000, "Description can not more than 4000 words"],
            required: [true, "Please Add Description of this Product"],
        },
        price: {
            type: Number,
            maxlength: [8, "Description can not more than 8 Number"],
            required: [true, "Please Add Prize for the product"],
        },
        images: {
            type: String,
        }
        ,
        stock: {
            type: Number,
            required: [true, "Please Add some stock to your Product"],
            maxlength: [2, "Discount can not be more than 3 number"],
        },
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const productModel = model("Product", productSchema);

module.exports.productModel = productModel;

