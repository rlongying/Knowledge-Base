
exports.loginPage = (req, res) => {
    res.render('login', {loginCSS: true });
};
 
exports.registerPage = (req, res) => {
    res.render('signup', {registerCSS: true });
};