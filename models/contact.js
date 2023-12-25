const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    phone: Number,
    msg: String,
},{
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);