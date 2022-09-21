const router = require("express").Router();
const { User } = require("../../models/User");


router.get('/login', (req, res) => {
    res.render("login");
})

router.post("/new", async (req, res) => {
    console.log(req.body);
    try{
        let newUser = await User.create(req.body)

        console.log(newUser);
        res.json(newUser)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.get("/new", (req, res) => {
    res.render("signup");
})

module.exports = router;