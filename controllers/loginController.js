let userModel = require('../models/user');


exports.loginPage = (req, res) => {
    if(req.session.user !== undefined) {
        res.redirect('/home');
    } else {
        res.render('login', {loginCSS: true });
    }
};

exports.login = (req, res) => {
    userModel.userLogin(req.body)
    .then(([rows, field]) => {
        if(rows.length > 0){
            req.session.user = rows[0];
            res.redirect('/home');
        } else {
            res.render('login', {loginCSS: true, loginFail: true})
        }
    })
    .catch((error) => console.log("login error: " + error));
};
 
exports.registerPage = (req, res) => {
    res.render('signup', {registerCSS: true, userInfo: req.body });
};

exports.register = (req, res) => {
    userModel.registerUser(req.body)
    .then(([rows, field]) => {
        res.redirect('/home');
    })
    .catch((error) => console.log("error: " + error));
};

exports.logout = (req, res) => {
    req.session.user = undefined;
    res.render('login', {loginCSS: true });
};