let express = require("express");
let router = express.Router();

let PostController = require("../controllers/PostController");

router.get("/:user", PostController.getPostsByUserId);
router.post("/add", PostController.addPost);
router.get("/search-by-msg/:msg", PostController.getPostsByConent);
router.get("/search-by-topic/:topic", PostController.getPostsByTopic);
router.get("/post/:postid", PostController.getPostDetail);

module.exports = router;
