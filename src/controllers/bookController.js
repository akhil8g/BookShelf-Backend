const booksModel = require ('../models/booksModel');
const wishListModel = require("../models/wishlistModel");
const readBook = async(req,res)=>{
    try {

    
      const data = await booksModel.find();
      res.status(200).json({ "data": data, "msg": "books read", "err": ""});
      
      } catch (err) {
        res.status(500).json({ "data": "", "msg": "", "err": "Error while reading books" });
        
      }
}

const readSpecificBook = async (req, res) => {
  try {
    const title = req.params.title;
    
    // Use a case-insensitive search for the title
    const books = await booksModel.find({
      title: { $regex: title, $options: "i" } // Case-insensitive regex search
    });

    // Return the found books
    res.status(200).json({ "data": books, "msg": "Books found", "err": "" });
  } catch (err) {
    res.status(500).json({ "data": "", "msg": "", "err": err.message });
  }
};


const createBook = async(req,res)=>{
    try {
        
        let data=req.body;
        
        
        const book = new booksModel(data);
       inserted = await book.save(data);
       
        
        res.status(201).json({ "data": inserted._id, "msg": "Data created", "err": "" });
    
    
      } catch (err) {
        res.status(501).json({ "data": "", "msg": "", "err": err.message });
      }
}

const updateBook = (req,res)=>{
    try {

        let id =req.params.id;
        let updatedFields = req.body;
        console.log(updatedFields,id);
        const data = fs.readFileSync('./src/books.json', "utf8");
      let books = JSON.parse(data);
    
      for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
          books[i] = { ...books[i], ...updatedFields };
          break;
        }
      }
      console.log(books);
    
      fs.writeFileSync('./src/books.json', JSON.stringify(books));
        res.status(200).json({ "data": "", "msg": "Book updated", "err": ""});
      } catch (err) {
        res.status(500).json({ "data": book, "msg": "", "err": err.message});
      }
}

const deleteBook = async (req, res) => {
  try {
    let id = req.params.id;

    // Delete the book from the books collection
    const deletedBook = await booksModel.findByIdAndDelete(id);
    console.log(deletedBook);

    if (deletedBook) {
      // Remove the reference to the deleted book from the wishlist collection
      await wishListModel.deleteOne({ bookId: id });

      res.status(200).json({ "data": "", "msg": "Book deleted", "err": "" });
    } else {
      res.status(404).json({ "data": "", "msg": "Book not found", "err": "" });
    }
  } catch (err) {
    res.status(500).json({ "data": "", "msg": "", "err": err.message });
  }
};


const readWishlist = async (req, res) => {
  try {
    // Populate the 'bookId' field to get the associated book details
    const data = await wishListModel.find().populate('bookId');

    // Map the result to return only the book details
    const bookDetails = data.map(item => item.bookId);

    res.status(200).json({ data: bookDetails, msg: "Wishlist read successfully", err: "" });
  } catch (err) {
    res.status(500).json({ data: "", msg: "", err: "Error while reading wishlist" });
  }
};


const addToWishlist = async (req, res) => {
  try {
    let { bookId } = req.body;

    // Validate bookId format
    

    // Create a new wishlist entry with the correct object structure
    const newWishlistEntry = new wishListModel({ bookId });

    // Save the new wishlist entry
    const savedEntry = await newWishlistEntry.save();

    // Fetch the book details
    const book = await booksModel.findById(bookId);

    res.status(201).json({ "data": book, "msg": "Book added to wishlist", "err": "" });
  } catch (err) {
    res.status(501).json({ "data": "", "msg": "", "err": err.message });
  }
};



const removeWishlist = async (req, res) => {
  try {
    let id = req.params.id;

    // Delete the book from the books collection
    deletedBook= await wishListModel.deleteOne({ bookId: id });
    console.log();

    if (deletedBook.deletedCount>0) {
      // Remove the reference to the deleted book from the wishlist collection
      

      res.status(200).json({ "data": "", "msg": "Book deleted", "err": "" });
    } else {
      res.status(404).json({ "data": "", "msg": "Book not found", "err": "" });
    }
  } catch (err) {
    res.status(500).json({ "data": "", "msg": "", "err": err.message });
  }
};




module.exports = {
    readBook,
    readSpecificBook,
    createBook,
    updateBook,
    deleteBook,
    readWishlist,
    addToWishlist,
    removeWishlist
}