let userModel = require('../models/user');
let postModel = require("../models/post");

// TODO: Add number of posts to user table or do seperate query on post table
exports.getProfile = (req, res) => {
    userModel.getUserById(req.params.userId)
    .then(([rows, field]) => {
        console.log(rows);
        res.render('userProfile', {profileCSS: true, user: rows[0] });
    })
    .catch(error => console.log("get profile error: " + error));
};