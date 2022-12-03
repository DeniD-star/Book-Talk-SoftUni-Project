const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/create', (req, res)=>{
    res.render('create')
})
router.post('/create', isUser(), async(req, res)=>{

    const bookData = {
        title: req.body.title.trim(),
        author: req.body.author.trim(),
        imageUrl: req.body.imageUrl.trim(),
        bookReview: req.body.bookReview.trim(),
        genre: req.body.genre.trim(),
        stars: Number(req.body.stars),
        wishingList : [],
        owner : req.user._id
    }
   try {
  

    await req.storage.createBook(bookData);
    res.redirect('/catalog')
   } catch (err) {
       console.log(err.message);
       let errors;
       if (err.errors) {
           errors = Object.values(err.errors).map(e => e.properties.message);
       } else {
           errors = [err.message]
       }

       const ctx ={
           errors,
           bookData: {
            title: req.body.title,
            author: req.body.author,
            imageUrl: req.body.imageUrl,
            bookReview: req.body.bookReview,
            genre: req.body.genre,
            stars: Number(req.body.stars)
           }
       }
       res.render('create', ctx)
   }
})

router.get('/catalog', async(req, res)=>{
    const books = await req.storage.getAllBooks();
    res.render('catalog', {books})
})
module.exports = router;