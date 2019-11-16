let mod = require('../models/user');

 
exports.messagePage = (req, res) => {
    res.render('message', {messageCSS: true });
};