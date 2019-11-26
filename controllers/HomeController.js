let homeModel = require('../models/user');
let postModel = require('../models/post');

exports.showHome = async (req, res) => {
    let user = await homeModel.getUserById(req.session.user.id).then(([rows,field]) =>{
        return rows
    });

    if(req.session.user !== undefined) {
        postModel.getLatestPosts()
        .then(([rows, field]) => {
            res.render('home', {homeCSS: true, postCSS: true, user: user, posts: rows });
        })
        .catch(error => console.log("get latest posts error: " + error));
    } else {
        res.redirect('/');
    }
};