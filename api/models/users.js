const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username: String,
    email: String,
    full_name: String,
    password: String
});

module.exports = mongoose.model('Users', usersSchema);