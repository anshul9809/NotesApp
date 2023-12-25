const mongoose = require("mongoose");
const newsLetterSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("NewsLetter", newsLetterSchema);