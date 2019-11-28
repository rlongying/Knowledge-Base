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

  // pagination logic...
  // not the best way to do it, but without fetch or ajax
  // this is what I can do
  let page = Number(req.body.page);
  if (!page) {
    page = 1;
  }

  // prev button clicked
  if (req.body.prev && page > 1) {
    page -= 1;
  }

  const totalPage = Math.ceil(postModel.LATEST_POST / postModel.POST_PER_PAGE);
  // next button clicked
  if (req.body.next && page < totalPage) {
    page += 1;
  }

  let startIndex = postModel.POST_PER_PAGE * (page - 1);
  let endIndex = postModel.POST_PER_PAGE * page;

  if (endIndex > posts.length) {
    posts = posts.slice(startIndex); // to the end of array
  } else {
    posts = posts.slice(startIndex, endIndex);
  }

  let prev = page > 1 ? true : false;
  let next = page < totalPage ? true : false;

  res.render("home", {
    homeCSS: true,
    postCSS: true,
    user: user[0],
    posts: posts,
    topics: topics,
    page,
    prev,
    next
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
