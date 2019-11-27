let userModel = require("../models/user");
let postModel = require("../models/post");

exports.showHome = async (req, res) => {
  let [user, userFields] = await userModel
    .getUserInfo(req.session.user.id)
    .catch(err => console.log(err));

  let [posts, postFields] = await postModel
    .getLatestPosts()
    .catch(error => console.log("get latest posts error: " + error));

  let [topics, topicFields] = await postModel.getTopics().catch(console.log);

  res.render("home", {
    homeCSS: true,
    postCSS: true,
    user: user[0],
    posts: posts,
    topics: topics
  });
};

exports.homePosts = async (req, res) => {
  let [user, userFields] = await userModel
    .getUserInfo(req.session.user.id)
    .catch(err => console.log(err));

  let [posts, postFields] = await postModel
    .getPostsByUserId(req.session.user.id)
    .catch(error => console.log("get latest posts error: " + error));

  res.render("homePosts", {
    homeCSS: true,
    postCSS: true,
    user: user[0],
    posts: posts
  });
};
