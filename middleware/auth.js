export const isAuthenticated = (req, res, next) => {
    if(req.session.userId){
        return next();
    }
    res.render("unauthorized.njk")
}

