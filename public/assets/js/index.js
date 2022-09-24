// Place script code here
const postBlogBtn = document.querySelector("#post-blog");
const blogTitle = document.querySelector("#blog-title");
const blogBody = document.querySelector("#blog-body");
const blogId = document.querySelectorAll(".blog-id")
const commentBtn = document.querySelectorAll(".comment-btn");
const commentInput = document.querySelectorAll(".comment-input");
const delCommentBtn = document.querySelectorAll(".del-com");
const commentUser = document.querySelectorAll(".com-userId");
const currId = document.querySelector("#currUser-id");
let commentIds;



const saveBlog = async () => {
    try{
        console.log(blogTitle.value)
        console.log(blogBody.value)
        let response = await fetch("/blogs/new", {
            method: 'POST',
            body: JSON.stringify({
                title: blogTitle.value,
                content: blogBody.value
            }),
            headers: { "Content-Type": "application/json"}
        })

        console.log(response);
        if(response.ok){
            console.log("All good");
            location.replace("/")
        }
    }catch(err){
        console.log(err);
    }
}

const sendComment = async (e) => {
    try{
        console.log("Working");
        console.log(e.target.nextElementSibling.value);
        console.log(e.target.previousElementSibling.value);
        let response = await fetch(`/comments/${e.target.nextElementSibling.value}`, {
            method: 'POST',
            body: JSON.stringify({
                content: e.target.previousElementSibling.value
            }),
            headers: {"Content-Type": "application/json"}
        })

        if(response.ok){
            location.replace("/");
        }
    } catch(err){
        console.log(err);
    }
}

const delComments = async (e) => {
    try{
        console.log(e.target.parentElement);
        console.log("hello");
        let response = await fetch(`/delcom/${e.target.nextElementSibling.value}`,{
            method: 'DELETE',
            body: {}
        })

        console.log(response);
        if(response.ok){
            e.target.parentElement.remove()
        }
    } catch(err){
        log(err)
    }
}

if(postBlogBtn){
    postBlogBtn.addEventListener("click", saveBlog);
}

if(commentBtn){
    commentBtn.forEach(item => {
        return item.addEventListener("click", sendComment)
   })
}

if(delCommentBtn){
    
    delCommentBtn.forEach(button => {
        commentUser.forEach(item => {
            console.log(item.value);
            if(item.value !== currId.value){
                button.classList.add("hide");
            }
        })
        button.addEventListener("click", delComments);
        
    })
}
