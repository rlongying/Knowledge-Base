let homeModel = require('../models/user');


exports.showHome = (req, res) => {
    res.render('home', {homeCSS: true });
};