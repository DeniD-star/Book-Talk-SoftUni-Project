const book = require('../services/bookService')

module.exports = ()=> (req, res, next)=>{
    req.storage = {
        ...book
    };
    next()
}