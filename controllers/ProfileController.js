let mod = require('../models/user');


exports.getProfile = (req, res) => {
    res.render('userProfile', {profileCSS: true });
};