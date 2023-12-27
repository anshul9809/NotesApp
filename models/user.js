const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName:{
        type: String,
        required: true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
    },
    profileImg:{
        type:String,
        required: true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);