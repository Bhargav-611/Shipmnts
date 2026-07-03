const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            require: true,
            unique: true,
        },
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);