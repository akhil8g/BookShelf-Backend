const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn =require('../services/db');

conn.dbConnection();

const userSchema = new Schema({
    "username": {
        type: String,
        required: [true,"Please enter the title"]
    },
    "password": String
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;