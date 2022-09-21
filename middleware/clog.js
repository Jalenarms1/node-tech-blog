// Place script code for middleware here
const checkAuth = (req, res, next) => {
    if(!req.session.loggedIn){
        res.render('login')
    }

    next();
}