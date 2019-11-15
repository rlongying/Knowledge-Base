let mod = require('../models/user');


exports.loginPage = (req, res) => {
    mod.test();
    res.render('login', {loginCSS: true });
};
 
exports.registerPage = (req, res) => {
    res.render('signup', {registerCSS: true });
};