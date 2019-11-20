let userModel = require('../models/user');
let postModel = require("../models/post");

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

async function likeUser(req, res) {
    await userModel.likeUser(req.params.userId).then(() => {}).catch(error => console.log("like user error: " + error));
    await userModel.getUserById(req.params.userId)
    .then(([rows, field]) => {
        postModel.getPostsByUserId(req.params.userId)
        .then(([postrows, field]) => {
            res.render('userProfile', {profileCSS: true, postCSS: true, user: rows[0], posts: postrows });
        }).catch(error => console.log("get user posts error: " + error));
    })
    .catch(error => console.log("get profile error: " + error));
};

module.exports = {
    getProfile : getProfile,
    likeUser : likeUser
};