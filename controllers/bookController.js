const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/create', (req, res)=>{
    res.render('create')
})
router.post('/create', isUser(), async(req, res)=>{
   try {
    const bookData = {
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        bookReview: req.body.bookReview,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        wishingList : [],
        owner : req.user._id
    }

    await req.storage.createBook(bookData);
    res.redirect('/catalog')
   } catch (err) {
       console.log(err.message);
       res.render('create')
   }
})
module.exports = router;