const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: [true, 'Title is required!'] ,  minLength: [2, 'Title must be at least 2 characters long!']},
    author: { type: String, required: [true, 'Author is required!'] ,  minLength: [5, 'Author must be at least 2 characters long!'] },
    imageUrl: { type: String, required: [true, 'Image is required!'] , match: [/^https?/, 'Image must be a valid URL!']},
    bookReview: { type: String, required:  [true, 'Review is required!'] ,  minLength: [10, 'Review must be at least 10 characters long!']},
    genre: { type: String, required: [true, 'Genre is required!'] ,  minLength: [3, 'Genre must be at least 2 characters long!'] },
    stars: { type: Number, required: [true, 'Stars are required!'], min: [1, 'The Stars should be a positive number between 1 and 5'], max: [5, 'The Stars should be a positive number between 1 and 5'] },
    
    owner : { type: Schema.Types.ObjectId, ref: 'User' }

})

module.exports = model('Book', schema);