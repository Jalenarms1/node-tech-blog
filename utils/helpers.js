const { User } = require("../models");

module.exports = {
    currLogginCheck: (req, res, next) => {
        if(req.session.isLoggedIn) {
            res.render("dashboard", {
                session_user: req.session.user_id,
                currUser: req.session.user,
                isLoggedOut: req.session.loggedOut
            })
            return 
        }
        next();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
          new Date(date).getFullYear()
        }`;
    },
    checkAuth: (req, res, next) => {
        if(!req.session.isLoggedIn){
            res.render("login", {
                isLoggedIn: req.session.isLoggedIn,
                session_user: req.session.user_id,
                currUser: req.session.user,
                isLoggedOut: req.session.loggedOut
            })
            return 
        } 
        next();
    }
    
    
}