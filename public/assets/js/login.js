var user = document.querySelector("#new-username-input");
var email = document.querySelector("#new-email-input");
var password = document.querySelector("#new-password-input")
var submitBtn = document.querySelector("#signup-btn");
var loginBtn = document.querySelector("#login");
var checkUsername = document.querySelector("#cur-user-input");
var checkPassword = document.querySelector("#cur-password-input");
var logout = document.querySelector("#logout");
var wrongUser = document.querySelector("#err-user");
var wrongPass = document.querySelector("#err-pass");


const createNewUser = async (e) => {
    e.preventDefault();
    let userBody = {
        username: user.value,
        email: email.value,
        password: password.value
    }

    const response = await fetch("/users/new", {
        method: 'POST',
        body: JSON.stringify(userBody),
        headers: { "Content-Type": "application/json"}
    })

    if(response.ok){
        document.location.replace("/")

    }
}

const loginPost = async (event) => {
    event.preventDefault();
    try{

        const response = await fetch("/users/login", {
            method: 'POST',
            body: JSON.stringify({
                username: checkUsername.value,
                password: checkPassword.value
            }),
            headers: { "Content-Type": 'application/json'}
        })
    
        if(response.ok){
            document.location.replace("/")
        } else if (response.status === 404){
            checkUsername.setAttribute("style", "border: 2px solid red");
            wrongUser.classList.remove("hide");
            checkPassword.removeAttribute("style");
            wrongPass.classList.add("hide");


        }else if (response.status === 400){
            checkPassword.setAttribute("style", "border: 2px solid red");
            wrongPass.classList.remove("hide");
            checkUsername.removeAttribute("style");
            wrongUser.classList.add("hide");
        } 

    }catch(err){
        console.log("Invalid");
        console.log(err);
    }
}

const loggedOut = async () => {
    let response = await fetch("/users/logout", {
        method: 'POST',
        headers: { "Content-Type": 'application/json'}

    })

    if(response.ok){
        window.location.replace("/")
    }
}

if(submitBtn){
    submitBtn.addEventListener("click", createNewUser);
}
if(loginBtn){
    loginBtn.addEventListener("click", loginPost);
}
if(logout){
    logout.addEventListener("click", loggedOut)
}
