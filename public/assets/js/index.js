// Place script code here
const postBlogBtn = document.querySelector("#post-blog");
const blogTitle = document.querySelector("#blog-title");
const blogBody = document.querySelector("#blog-body");

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
        }
    }catch(err){
        console.log(err);
    }
}

if(postBlogBtn){
    postBlogBtn.addEventListener("click", saveBlog);
}
