let express = require("express");
let router = express.Router();

let PostController = require("../controllers/PostController");

router.get("/user/:userId", PostController.getPostsByUserId);
router.post("/add", PostController.addPost);
router.post("/search-by-msg", PostController.getPostsByContent);
router.post("/search-by-topic", PostController.getPostsByTopic);
router.get("/post/:postId", PostController.getPostDetail);
router.get("/latest", PostController.getLatestPosts);
router.post("/post/addComment", PostController.addComment);
router.get("/topics", PostController.getTopics);
module.exports = router;
