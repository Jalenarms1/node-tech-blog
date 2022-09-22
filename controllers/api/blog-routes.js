const router = require("express").Router();
const { User, Blog } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try{
        let allBlogs = await Blog.findAll({
            include: [{model: User}]
        })

        const blogs = allBlogs.map(item => {
            return item.get({plain: true})
        })

        console.log((blogs));

        res.render("homepage", {
            isLoggedIn: req.session.isLoggedIn,
            blogs
    
        });

    } catch(err){
        res.status(500).json(err)
    }
})

router.post("/blogs/new/:id", async (req, res) => {
    try{
        let newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            blogger_id: req.params.id
        })

        if(newBlog){
            res.json(newBlog)
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn
            })
        }
    }catch (err){
        res.status(500).json(err)
    }
})
module.exports = router;