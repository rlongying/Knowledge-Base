let express = require("express");
let router = express.Router();
let homeController = require("../controllers/HomeController");

router.get("/home", homeController.showHome);

module.exports = router;
