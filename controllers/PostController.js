exports.getPostsByConent = (req, res) => {};

exports.getPostsByTopic = (req, res) => {};

exports.getPostDetail = (req, res) => {
  res.send("getting post with id: " + req.params.postid);
};

exports.getPostsByUserId = (req, res) => {};

exports.addPost = (req, res) => {
  res.send("adding a post");
};
