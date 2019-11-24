let userModel = require('../models/user');


exports.loginPage = (req, res) => {
    res.render('login', {loginCSS: true });
};
 
exports.registerPage = (req, res) => {
    res.render('signup', {registerCSS: true, userInfo: req.body });
};

exports.register = (req, res) => {
    const { firstname , lastname, email, password, img, description, country, dob } = req.body;
    let user = { firstname , lastname, email, password, img, description, country, dob };
    userModel.registerUser(user)
    .then(([rows, field]) => {
        res.render('home', {homeCSS: true });
    })
    .catch((error) => console.log("error: " + error));
};