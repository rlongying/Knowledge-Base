let express = require("express");
let router = express.Router();
let homeController = require("../controllers/HomeController");

router.get("/", homeController.showHome);
router.get("/posts", homeController.homePosts);

module.exports = router;
