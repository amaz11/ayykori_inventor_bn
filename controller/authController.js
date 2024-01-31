const bcrypt = require('bcryptjs')
const CatchAsyncs = require("../middleware/catchAsyncs");
const ErrorHandler = require('../utils/ErrorHandler')
const { userModel } = require("../model/userModel");


// hassPasswor
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//token generator function
const sendToken = (user, statusCode, res) => {
    const token = user.generateJWT();
    // const options = {
    //     httpOnly: true,
    //     // secure: true,
    //     maxAge: 1000 * 60 * 60 * 24 * 7,
    // };
    user.password = undefined;
    // return res.status(statusCode).cookie("jwt", token, options).json({
    //     success: true,
    //     message: "Success",
    //     user,
    // });
    return res.status(statusCode).json({
        success: true,
        message: "Success",
        user,
        token
    });
};

//signup
const signup = CatchAsyncs(async (req, res, next) => {
    const { name, email, password, conpassword } = req.body;
    if ((!name, !email || !password, !conpassword)) {
        return next(new ErrorHandler("Fill The Form", 400));
    }
    if (password === conpassword) {
        const user = await new userModel({
            name,
            email,
            password,
            avater: {
                public_id: "this is sample id",
                url: "sample url",
            },
        });
        // user.password = await hashPassword(user.password);
        await user.save();
        sendToken(user, 201, res);
    } else {
        return next(new ErrorHandler("Password Not Match", 400));
    }
});

//signin
const signin = CatchAsyncs(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Fill The Form", 400));
    }
    const user = await userModel.findOne({ email }).select("+password");
    if (user) {
        const passwordCheck = await bcrypt.compare(password, user.password);
        console.log(passwordCheck);
        if (passwordCheck) {
            console.log("matha 2");
            sendToken(user, 200, res);
        } else {
            console.log("matha3");
            return next(new ErrorHandler("Invalid Info or Need Registretion", 400));
        }
    } else {
        return next(new ErrorHandler("Invalid Info or Need Registretion", 400));
    }
});

//Logout
const signout = CatchAsyncs(async (req, res, next) => {
    return res
        .status(200)
        .json({
            success: true,
            message: "Logged oUt",
        });
});

module.exports = {
    signin, signout, signup
}