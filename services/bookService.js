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

async function editBook(bookId, bookData){
    const book = await Book.findById(bookId);
    book.title = bookData.title.trim()
    book.author = bookData.author.trim()
    book.imageUrl = bookData.imageUrl.trim()
    book.bookReview = bookData.bookReview.trim()
    book.genre = bookData.genre.trim()
    book.stars = Number(bookData.stars).trim();

    return book.save()
   
}
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    editBook
}