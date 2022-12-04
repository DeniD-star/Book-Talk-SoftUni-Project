const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: true},
    email:{type: String, required: true},
    hashedPassword: {type: String, required: true},
    wishingList : [{ type: Schema.Types.ObjectId, ref: 'Book', default: [] }],
})

module.exports = model('User', schema);