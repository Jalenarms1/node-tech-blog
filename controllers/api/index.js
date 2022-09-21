// Place script code for routes here
const router = require("express").Router();
const { User } = require("../../models/User");
const userRoutes = require("./user-routes");

router.use("/users", userRoutes)



module.exports = router;

