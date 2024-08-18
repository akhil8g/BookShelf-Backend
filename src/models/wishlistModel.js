const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const conn = require('../services/db');

conn.dbConnection();

const wishListSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'books', // Reference to the books collection
    required: true
  }
});

// Create the wishlist model
const wishListModel = mongoose.model("wishlists", wishListSchema);

module.exports = wishListModel;
