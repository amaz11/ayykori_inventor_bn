const { userModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchAsyncs");
const ErrorHandler = require("../utils/ErrorHandler");

exports.verifyuser = catchAsyncError(async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Not athurize" });
    }
    token = token.split("Bearer ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decode.id);
    next();
});


exports.authrizeRoles = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return next(new ErrorHandler("Forbbiden For You", 403));
        }
        next();
    };
};