const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        minlength: 12,
    },
    password: {
        type: String,
        required: true,
        minlength: 12
    }
})

module.exports = mongoose.model("user", userSchema);