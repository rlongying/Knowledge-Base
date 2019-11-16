let express = require("express");
let router = express.Router();

let PostController = require("../controllers/PostController");

router.get("/:userId", PostController.getPostsByUserId);
router.post("/add", PostController.addPost);
router.get("/search-by-msg/:msg", PostController.getPostsByContent);
router.get("/search-by-topic/:topic", PostController.getPostsByTopic);
router.get("/post/:postId", PostController.getPostDetail);

module.exports = router;
