const Book = require('../models/Book');
const User = require('../models/User');

async function createBook(bookData){
    const book = new Book(bookData);

    await book.save();
    return book;
}



async function getAllBooks(){
    const books = await Book.find({}).lean()
    return books;
}
async function getBookById(id){
    const book = await Book.findById(id);
    return book;
}


module.exports = {
    createBook,
    getAllBooks,
    getBookById
}