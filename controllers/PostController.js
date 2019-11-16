let postModel = require("../models/post");

exports.getPostsByContent = (req, res) => {
  const { msg } = req.params;

  postModel
    .getPostsByContent(msg)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(error => console.log("get posts by content error: " + error));
};

exports.getPostsByTopic = (req, res) => {
  const { topic } = req.params;
  postModel
    .getPostsByTopic(topic)
    .then(([rows, fields]) => {
      res.json(rows);
    })
    .catch(error => console.log("get post by topic error: " + error));
};

exports.getPostDetail = (req, res) => {
  const { postId } = req.params;

  postModel
    .getPost(postId)
    .then(([rows, fields]) => {
      if (error)
        if (rows) {
          res.json(rows);
        }
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
  res.send("adding a post");
};
