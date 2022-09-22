const router = require("express").Router();
const { User } = require("../../models/User");
const bcrypt = require("bcrypt");


router.get('/login', (req, res) => {
    res.render("login", {
        isLoggedIn: req.session.isLoggedIn,

    });
})

router.post("/login", async (req, res) => {
    console.log(req.body);
    try{
        let currentUser = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if(!currentUser){
            res.status(404).json({errMsg: "Invalid user"})
            return
        }

        let validPassword = await currentUser.authPassword(req.body.password);

        if(!validPassword){
            res.status(404).json({errMsg: "Invalid information"})
            return
        }

        req.session.save(() => {
            req.session.isLoggedIn = true;


            console.log("User logged in");
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
            });
            
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/new", async (req, res) => {
    console.log(req.body);
    try{
        let newUser = await User.create(req.body)

        req.session.save(() => {
            req.session.isLoggedIn = true;

            res.json(newUser)

        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/new", (req, res) => {
    res.render("signup", {
        isLoggedIn: req.session.isLoggedIn,

    });
})

//  in progress
router.post("/logout", (req, res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
})

module.exports = router;