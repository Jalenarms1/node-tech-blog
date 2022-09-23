module.exports = {
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
          new Date(date).getFullYear()
        }`;
    },
    checkAuth: (req, res, next) => {
        if(!req.session.isLoggedIn){
            res.render("login", {
                isLoggedIn: req.session.isLoggedIn
            })
            return 
        } 
        next()
    }
}