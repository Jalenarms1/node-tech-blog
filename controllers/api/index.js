// Place script code for routes here
const router = require("express").Router();
const { User } = require("../../models/User");
const userRoutes = require("./user-routes");
const blogRoutes = require("./blog-routes");
const dashRoutes = require("./dashboard-routes");

router.use("/users", userRoutes);
router.use("/", blogRoutes);
router.use("/dashboard", dashRoutes);



module.exports = router;

