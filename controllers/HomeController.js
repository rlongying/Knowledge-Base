let homeModel = require('../models/user');
let postModel = require('../models/post');

exports.showHome = (req, res) => {
    if(req.session.user !== undefined) {
        postModel.getLatestPosts()
        .then(([rows, field]) => {
            res.render('home', {homeCSS: true, postCSS: true, user: req.session.user, posts: rows });
        })
        .catch(error => console.log("get latest posts error: " + error));
    } else {
        res.redirect('/');
    }
};