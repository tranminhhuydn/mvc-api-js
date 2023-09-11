exports.index = function(req,res,next){
    res.render('index-1');
}
exports.register = function(req,res,next){
    res.render('register-2');
}
exports.profile = function(req,res,next){
    res.render('profile');
}
exports.edit = function(req,res,next){
    res.render('profile');
}
exports.loginProvider = function(req,res,next){
    res.render('login');
}
exports.login = function(req,res,next){
    //POST
    if(req.method=='POST'){
        console.log('post');
        console.log(req.body);
    }
    //GET
    res.locals.leftMenu = []
    res.render('login-2');
}
exports.logout = function(req,res,next){
    return res.redirect('/user/login')
}
exports.lostPassword = function(req,res,next){
    res.render('lost-password')
}
