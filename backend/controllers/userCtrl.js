const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userModel = require("../models/userModel")
const sendToken = require("../utils/sendToken")
const UserFactory = require('../utils/userFactory');
const sendEmail = require("../utils/sendEmail");

exports.registerUser = asyncHandler(async (req, res) => {
    try {
      const newUser = await UserFactory.createUser(req.body);
      res.status(201).json({ success: true, newUser });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

exports.loginUser = asyncHandler(async (req, res)=>{

    let {email, password} = req.body;

    if(!email || !password){
        res.status(400)
        throw new Error("All fields are Required!")
    }

    let user = await userModel.findOne({email}).select("+password");

    if(!user){
        res.status(401)
        throw new Error("Email is not registered...")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        res.status(401)
        throw new Error("Incorrect email or password!");
    }

    sendToken(user, res);

})

exports.logoutUser = asyncHandler(async (req, res)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged out!"
    })
})


exports.resetPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found with this email");
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;

    const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message,
        });

        res.status(200).json({ success: true, message: "Email sent" });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        console.error('Error sending email:', error);
        res.status(500);
        throw new Error("Email could not be sent");
    }
});


exports.resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await userModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error("Invalid token or token has expired");
    }

    const { password, confirmPass } = req.body;
    if (password !== confirmPass) {
        res.status(400);
        throw new Error("Passwords do not match");
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
});