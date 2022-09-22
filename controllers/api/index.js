// Place script code for routes here
const router = require("express").Router();
const { User } = require("../../models/User");
const userRoutes = require("./user-routes");
const blogRoutes = require("./blog-routes");

router.use("/users", userRoutes);
router.use("/", blogRoutes);



module.exports = router;

