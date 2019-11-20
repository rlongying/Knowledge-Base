let userModel = require('../models/user');
let postModel = require("../models/post");

// TODO: Add number of posts to user table or do seperate query on post table
async function getProfile(req, res) {
    await userModel.getUserById(req.params.userId)
    .then(([rows, field]) => {
        postModel.getPostsByUserId(rows[0].id)
        .then(([postrows, field]) => {
            console.log(postrows);
            res.render('userProfile', {profileCSS: true, postCSS: true, user: rows[0], posts: postrows });
        }).catch(error => console.log("get user posts error: " + error));
    })
    .catch(error => console.log("get profile error: " + error));
};

module.exports.getProfile = getProfile;