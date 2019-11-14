
exports.loginPage = (req, res) => {
    res.render('login', {loginCSS: true });
};
 
exports.registerPage = (req, res) => {
    res.render('register', {registerCSS: true });
};