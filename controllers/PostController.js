let postModel = require("../models/post");

exports.getPostsByContent = (req, res) => {
  const { msg } = req.body;

  postModel
    .getPostsByContent(msg)
    .then(([rows, fields]) => {
      res.render("postResults", { postCSS: true, posts: rows });
    })
    .catch(error => console.log("get posts by content error: " + error));
};

exports.getPostsByTopic = (req, res) => {
  const { topic } = req.body;
  postModel
    .getPostsByTopic(topic)
    .then(([rows, fields]) => {
      res.render("postResults", { postCSS: true, posts: rows });
    })
    .catch(error => console.log("get post by topic error: " + error));
};

exports.getPostDetail = (req, res) => {
  const { postId } = req.params;

  postModel
    .getPost(postId)
    .then(({ post, comments }) => {
      // res.json({ post, comments, user: req.session.user.id });

      res.render("postResults", {
        postCSS: true,
        post,
        comments,
        user: req.session.user.id,
        postView: true
      });
    })
    .catch(error => console.log("get a post by id error: " + error));
};

exports.getPostsByUserId = (req, res) => {
  const { userId } = req.params;

  postModel
    .getPostsByUserId(userId)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(error => console.log("get posts by user id error: " + error));
};

exports.addPost = (req, res) => {
  const { topic, subject, message, user_id } = req.body;
  // change the date to locale
  created_at = new Date();

  let post = { topic, subject, message, created_at, user_id };

  postModel
    .addPost(post)
    .then(results => res.redirect("/home"))
    .catch(err => res.json({ "add error:": err }));
};

exports.getLatestPosts = (req, res) => {
  postModel
    .getLatestPosts()
    .then(([rows, fields]) => {
      // res.json(rows);
      res.render("postResults", { postCSS: true, posts: rows });
    })
    .catch(err => console.log("get latest posts error: " + err));
};

exports.addComment = (req, res) => {
  const { message, created_at, post_id, user_id } = req.body;

  postModel
    .addComment({ message, created_at, post_id, user_id })
    .then(result => res.redirect(301, "/posts/post/" + post_id))
    .catch(err => console.log("add comment error: " + err));
};

exports.getTopics = (req, res) => {
  postModel
    .getTopics()
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(err => console.log("get topics error: " + err));
};
