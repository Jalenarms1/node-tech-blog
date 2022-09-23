const router = require("express").Router();
const { User, Blog, Comment } = require('../../models');
const { checkAuth } = require("../../utils/helpers");


router.get('/', checkAuth, (req, res) => {
    res.render("dashboard", {
        isLoggedIn: req.session.isLoggedIn
    });
})

module.exports = router;