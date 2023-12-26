const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    }
},{
    timestamps: true,
});