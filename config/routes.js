const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const bookController = require('../controllers/bookController');

module.exports=(app)=>{
    app.use('/auth', authController)
    app.use('/', homeController)
    app.use('/books', bookController)
}