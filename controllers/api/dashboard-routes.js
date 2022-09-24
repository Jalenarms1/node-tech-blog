const router = require("express").Router();
const { User, Blog, Comment } = require('../../models');
const { checkAuth } = require("../../utils/helpers");


router.get('/', checkAuth, async (req, res) => {
    try{
        let currUser = await User.findOne({
            where: {
                id: req.session.user_id
            }, 
            attributes: { exclude: [ "password" ] },
            include: [{model: Blog}]
            
        })

        let userBlogs = currUser.get({plain: true});

        // res.json(userBlogs);

        res.render("dashboard", {
            isLoggedIn: req.session.isLoggedIn,
            userBlogs,
            currUser: req.session.user,
            session_user: req.session.user_id,
            
        });
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

module.exports = router;