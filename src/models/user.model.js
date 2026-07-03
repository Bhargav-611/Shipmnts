const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        name: {
            type: String,
            require: [true, "name and email are required"]
        },
        email: {
            type: String,
            require: [true, "name and email are required"],
            unique: [true, "A user with this email already exists"]
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);