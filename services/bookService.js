const Book = require('../models/Book');
const User = require('../models/User');

async function createBook(bookData){
    const book = new Book(bookData);

    await book.save();
    return book;
}


module.exports = {
    createBook
}