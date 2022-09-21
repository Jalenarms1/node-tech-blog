var username = document.querySelector("#new-username-input");
var email = document.querySelector("#new-email-input");
var password = document.querySelector("#new-password-input")
var submitBtn = document.querySelector("#signup-btn");
var loginBtn = document.querySelector("#login");
var checkUsername = document.querySelector("#cur-user-input");
var checkPassword = document.querySelector("#cur-password-input");
var logout = document.querySelector("#logout");



const createNewUser = async (e) => {
    e.preventDefault();
    let userBody = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    const response = await fetch("/users/new", {
        method: 'POST',
        body: JSON.stringify(userBody),
        headers: { "Content-type": "application/json"}
    })

    if(response.ok){
        document.location.replace("/blogs")

    }
}

const loginPost = async (event) => {
    event.preventDefault();

    const response = await fetch("/users/login", {
        method: 'POST',
        body: JSON.stringify({
            username: checkUsername.value,
            password: checkPassword.value
        }),
        headers: { "Content-Type": 'application/json'}
    })

    if(response.ok){
        document.location.replace("/blogs")
    }
}

const loggedOut = async () => {
    let response = await fetch("/users/logout", {
        method: 'POST',
        headers: { "Content-Type": 'application/json'}

    })

    if(response.ok){
        window.location.replace("/blogs")
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
