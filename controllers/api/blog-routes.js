const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try{
        let allBlogs = await Blog.findAll({
            include: [{model: User}, {model: Comment, include: [{model: User, attributes: ['username']}]}]
        })

        const blogs = allBlogs.map(item => {
            return item.get({plain: true})
        })
        console.log(blogs);
        

        // res.json(blogs)

        res.render("homepage", {
            isLoggedIn: req.session.isLoggedIn,
            blogs,
    
        });

    } catch(err){
        console.log(err);
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
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn
            })
        }
    }catch (err){
        res.status(500).json(err)
    }
})

router.post("/comments/:id", async (req, res) => {
    try{
        let newComment = await Comment.create({
            user_id: req.params.id,
            content: req.body.content,
            blog_id: req.body.blog_id
        })

        if(!newComment){
            res.status(400).json({errMsg: 'Error adding comment'})
            return 
        }
        // res.json(newComment)

        res.render("homepage", {
            isLoggedIn: req.session.isLoggedIn
        })



    }catch (err){
        res.json(err)
    }
})

router.get("/comments", async (req, res) => {
    try{
        let blogNComments = await Comment.findAll({
            include: [{model: Blog}, {model: User, attributes: ['id','username']}]
        })
        console.log(blogNComments);

        if(blogNComments){
            res.json(blogNComments)
        }
    } catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;