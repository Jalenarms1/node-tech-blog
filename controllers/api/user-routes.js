const router = require("express").Router();
const { User, Blog } = require("../../models");
const bcrypt = require("bcrypt");
const { currLogginCheck, checkDuplicateEmail } = require("../../utils/helpers");
let currentLoggedIn;



router.get('/login', (req, res) => {
    res.render("login", {
        isLoggedIn: req.session.isLoggedIn,
        currUser: req.session.user,
        session_user: req.session.user_id
    });
})

// gets all users and their blog posts that they have made
router.get('/', async (req,res) => {
    try{
        let allUsers = await User.findAll({
            include: [{model: Blog}]
        })

        if(allUsers){
            res.json(allUsers)
        }
    }catch (err){
        res.status(500).json(err)
    }
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
            res.status(400).json({errMsg: "Invalid information"})
            return
        }

        


        req.session.save(() => {
            req.session.user_id = currentUser.id;
            req.session.isLoggedIn = true;
            req.session.user = currentUser.username;
            req.session.isLoggedOut = false;

            
            console.log(currentLoggedIn);
            console.log("User logged in");
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
                session_user: req.session.user_id,
                currUser: req.session.user,
                isLoggedOut: req.session.loggedOut



            });

            console.log(req.session.user_id);
            
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/new", async (req, res) => {
    console.log(req.body);
    try{
        let newUser = await User.create(req.body)

        

        req.session.save(() => {
            req.session.isLoggedIn = true;
            req.session.user = newUser.username
            req.session.user_id = newUser.id;
            req.session.loggedOut = false;

           


            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
                session_user: req.session.user_id,
                currUser: req.session.user,
                isLoggedOut: req.session.loggedOut





            });

        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/new", currLogginCheck, async (req, res) => {
    res.render("signup", {
        isLoggedIn: req.session.isLoggedIn,
        currUser: req.session.user,
        session_user: req.session.user_id,
        isLoggedOut: req.session.loggedOut




    });
})

// logs the current user out of their account 
router.post("/logout", (req, res) => {
    if(req.session.isLoggedIn){
        req.session.destroy(() => {
            console.log("logged out");
            res.status(204).end()
        })
    }
})

module.exports = router;