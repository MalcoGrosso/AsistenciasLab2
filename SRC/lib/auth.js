const auth = (Permissions) => {
    return (req, res, next) => {
        if(req.user == undefined){
            req.flash('message', 'No tiene permisos');
            res.redirect('/')
        }
        else{
        const usu = req.user.rol;
        
        if (Permissions.includes(usu)){
            next();
        }
        else {
            req.flash('message', 'No tiene permisos');
            res.redirect('/profile')
            }
        }    
    }
}

module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },

    auth
};