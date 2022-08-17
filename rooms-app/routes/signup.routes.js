const router = require('express').Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

//Signup//
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});


/*router.post("/signup", (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(() => {
        console.log("save is worked", user);
        res.redirect('login');
    })
    .catch(error => console.log(error));
    //Authentication logic goes here
})*/
router.post("/signup", (req, res) => {
    const {username, email, password } = req.body;
    bcryptjs.hash(password, saltRounds)
    .then(hashedPwd => {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hashedPwd
        console.log("save is worked 1", user);

        return user;
    }).then(createdUser =>{
        createdUser.save().then(savedUser => {
            console.log("save is worked 2", savedUser);
            res.redirect('login');
        })
    })
    .catch(error => console.log(error));

    //Authentication logic goes here
})


/* GET Profile page */
router.get("/profile", (req, res) => {
    const {email} = req.session.currentUser;
    res.render("auth/profile", { email });
});

module.exports = router;