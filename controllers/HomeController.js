let homeModel = require('../models/user');


exports.showHome = (req, res) => {
    if(req.session.user !== undefined) {
        res.render('home', {homeCSS: true, user: req.session.user });
    } else {
        res.redirect('/');
    }
};