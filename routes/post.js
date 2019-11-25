let express = require("express");
let router = express.Router();

let PostController = require("../controllers/PostController");

router.get("/user/:userId", PostController.getPostsByUserId);
router.post("/add", PostController.addPost);
router.get("/search-by-msg/:msg", PostController.getPostsByContent);
router.get("/search-by-topic/:topic", PostController.getPostsByTopic);
router.get("/post/:postId", PostController.getPostDetail);
router.get("/latest", PostController.getLatestPosts);
router.post("/post/addComment", PostController.addComment);
module.exports = router;
