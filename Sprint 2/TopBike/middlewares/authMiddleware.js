function authMiddleware(req, res, next){
    if( !req.session.userLogged){
        return res.redirect('/user/login')
    }
    next();
    
    // if(req.session.usuarioLogueado != undefined){
    //     next();
    // } else {
    //     res.send('Esta pagina es solo para usuarios')
    // }
}

module.exports = authMiddleware;