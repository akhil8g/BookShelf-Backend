const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn =require('../services/db');

conn.dbConnection();

const bookSchema = new Schema({

    "key": String,
    "title": {
        type: String,
        required: [true,"Please enter the title"]
    },

    "author_name":{
        type: Array
    },

    "cover_i": String
})

const booksModel = mongoose.model("books",bookSchema);
module.exports = booksModel;