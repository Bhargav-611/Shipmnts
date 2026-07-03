const User = require("../models/user.model");
const Connection = require("../models/connection.model");
const ConnectionRequest = require("../models/connectionRequest.model");

exports.createUser = async (req, res) => {
    try {

        const { name, email } = req.body;
        
        
        if (!name || !email) {
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: "name and email are required"
            })
        }
        
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(409).json({
                error: "EMAIL_ALREADY_EXISTS",
                message: "A user with this email already exists"
            })
        }
        
        const totalUser = await User.countDocuments();
        newID = "u".concat(totalUser+1);
        const newUser = await User({
            id: newID,
            name: name,
            email: email,
        })

        newUser.save();
        console.log(totalUser);

        res.set('current_user_id', newUser.id);
        res.status(200).json({
            "id" : newUser.id,
            "name" : name,
            "email" : email,

        })
    }
    catch (err) {
        res.status(500).json({
            error: "INTERNAL_ERROR",
            message: "Something went wrong, please try again"
        })
    }

};

exports.connectionRequest = async (req, res) => {
    try{
        const {toUserId} = req.body;
        const fromUserId = req.get('current_user_id');
        
        
        if(!toUserId) {
            res.status(400).json({
                error: "VALIDATION_ERROR", 
                message: "toUserId is required"
            });
        }
        if(!fromUserId) {
            res.status(400).json({
                error: "VALIDATION_ERROR", 
                message: "fromUserId is required"
            });
        }

        if(toUserId == fromUserId) {
            res.status(400).json({
                error: "VALIDATION_ERROR", 
                message: "A user cannot connect with themselves"
            });
        }

        const toUser = await User.findOne({id: toUserId});

        if(!toUser) {
            res.status(404).json({
                error: "USER_NOT_FOUND", 
                message: "No user found with id "+toUserId
            });
        }

        const fromUser = await User.findOne({id: fromUserId});

        if(!fromUser) {
            res.status(404).json({
                error: "USER_NOT_FOUND", 
                message: "No user found with id "+fromUserId
            });
        }
        
        // const count = await Connection.count({ toUserId:toUser,fromUserId:fromUser });
        // const exist = count > 0;

        // console.log(exist);


        // if(exist) {
        //     res.status(409).json({
        //         error: "ALREADY_CONNECTED", 
        //         message: "These users are already connected"
        //     });
        // }



        const totalUser = await ConnectionRequest.countDocuments();
        newID = "c".concat(totalUser+1);

        const newreq = ConnectionRequest({
            id: newID,
            fromUserId: fromUser,
            toUserId: toUser,
        });

        newreq.save();

        res.set("current_user_id", fromUserId);
        res.status(200).json({
            "id" : newreq.id,
            "fromUserId": fromUserId,
            "toUserId": toUserId,
        });


    } catch(err) {
        res.status(500).json({
            error: "INTERNAL_ERROR",
            message: "Something went wrong, please try again"
        });
    }
}