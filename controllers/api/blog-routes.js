const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const bcrypt = require("bcrypt");
const { checkAuth } = require("../../utils/helpers");

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
            currUser: req.session.user,
            session_user: req.session.user_id,



        });

    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/blogs/new", async (req, res) => {
    try{
        let newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            blogger_id: req.session.user_id
        })

        console.log(newBlog);

        if(newBlog){
            res.render("homepage", {
                isLoggedIn: req.session.isLoggedIn,
                currUser: req.session.user

                // session_user: req.session.user_id

            })
        }
    }catch (err){
        res.status(500).json(err)
    }
})

router.post("/comments/:blogId", checkAuth, async (req, res) => {
    try{
        let newComment = await Comment.create({
            user_id: req.session.user_id,
            content: req.body.content,
            blog_id: req.params.blogId
        })

        console.log(req.params.blogId);
        
        if(!newComment){
            res.status(400).json({errMsg: 'Error adding comment'})
            return 
        }
        // res.json(newComment)
        console.log(newComment);

        res.render("homepage", {
            isLoggedIn: req.session.isLoggedIn,
            currUser: req.session.user,
            session_user: req.session.user_id,


            // session_user: req.session.user_id

            
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

router.delete("/delcom/:id", async (req, res) => {
    try{
        let deletedCom = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(deletedCom)
        // res.status(200)

        console.log(deletedCom);

    }catch (err){
        console.log(err);
        res.json(err)
    }
})



module.exports = router;