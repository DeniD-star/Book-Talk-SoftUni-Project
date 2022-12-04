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
    const book = await Book.findById(id).lean();
    return book;
}

async function editBook(bookId, bookData){
    const book = await Book.findById(bookId);
    book.title = bookData.title.trim()
    book.author = bookData.author.trim()
    book.imageUrl = bookData.imageUrl.trim()
    book.bookReview = bookData.bookReview.trim()
    book.genre = bookData.genre.trim()
    book.stars = bookData.stars;

    return book.save()
   
}

async function deleteBook(id){
    return Book.findByIdAndDelete(id);
}


async function addBook(bookId, userId){
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (book.owner == user._id) {
        throw new Error('Cannot add your own book!');
    }
    user.wishingList.push(bookId);
    return user.save()
}
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    editBook,
    deleteBook,
    addBook
}