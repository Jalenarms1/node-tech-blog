var username = $("#new-username-input");
var email = $("#new-email-input");
var password = $("#new-password-input")
var submitBtn = $("#signup-btn");

const createNewUser = (e) => {
    e.preventDefault();
    let body = {
        username: username.val(),
        email: email.val(),
        password: password.val()
    }

    $.ajax({
        url: '/users/new',
        method: 'POST',
        dataType: "application/json",
        data: body

    }).then(response => {
        console.log(response)
    })
}

submitBtn.on("click", createNewUser);
