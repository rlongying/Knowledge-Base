let mod = require('../models/user');


exports.showHome = (req, res) => {
    res.render('home', {homeCSS: true });
};