const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
    },
    username: {
        type: String,
        required: [true, "Please enter username..."],
        unique: [true, "Username is already taken!"],
        // validate: [validator.isAlphanumeric, "Username can't contain special characters..."]
    },
    email: {
        type: String,
        required: [true, "Please enter your email..."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email..."]
    },
    password: {
        type: String,
        // required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    googleId: {
        type: String,
    },
    facebookId: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {
        timestamps: true
    }
)

// Method to generate reset token
userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);