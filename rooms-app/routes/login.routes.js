const router = require('express').Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Check for empty fields
    if (email === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Please enter both, email and password to login.'
        });
        return;
    }
    // 1.  if the user is registered ==> meaning did user with provided email/username already exist in our app,
    console.log("login post is mail", email)
    console.log("login post is password", password)
    User.findOne({ email })
        .then(result => {
            console.log("login post is worked", result)
            if (!result) {
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, result.password)) {
                // 4. if both are correct, let the user in the app.
                req.sessioncookie = result;
                console.log("result.username", result.username)
                res.render('auth/profil', {username: result.username});
            } else {
                // 3. send an error message to the user if any of above is not valid,
                res.render('auth/login', { errorMessage: 'Incorrect password.' });
            }
        })
        .catch(err => console.log(err))
})

//Logout
router.post('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

module.exports = router;