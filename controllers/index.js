// Place script code for routes here
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/", apiRoutes)

router.use("*", (req, res) => {
    res.render("homepage")
})


module.exports = router;