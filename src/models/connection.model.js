const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            index:true,
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            index:true,
        },
        status: {
            type: String,
            enum: ["ACCEPT", "REJECT"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Connection", connectionSchema);
