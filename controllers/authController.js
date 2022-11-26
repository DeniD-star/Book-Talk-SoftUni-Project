const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const {isGuest} = require('../middlewares/guards')


router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
})

router.post('/register',
    body('username', 'Username is required!').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long!'),
    body('email', 'Email is required!').isEmail().withMessage('Invalid email!').isLength({ min: 10 }).withMessage('Email must be at least 10 characters long!'),
    body('password', 'Password is required!').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long!'),
    body('rePass', 'Repeat password, please!').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match!')
        }
        return true
    }),
    isGuest(),
    async (req, res) => {

        const { errors } = validationResult(req);
        try {

            if (errors.length > 0) {
                throw new Error('Validation error!')
            }
            console.log(errors);
            await req.auth.register(req.body.email, req.body.username, req.body.password);
            console.log(req.auth);
            res.redirect('/');
        } catch (err) {

            const ctx = {
                errors,
                userData: {
                    username: req.body.username,
                    email: req.body.email
                }
            }


            res.render('register', ctx)
        }

    })

router.get('/login', isGuest(),(req, res) => {
    res.render('login');
})
router.post('/login', isGuest(),async (req, res) => {

    try {

        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');

    } catch (err) {

        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username,

            }
        }
        console.log(err.message);
        res.render('login', ctx);
    }

})

router.get('/logout', (req, res)=>{
    req.auth.logout();
    res.redirect('/');
})

module.exports = router;