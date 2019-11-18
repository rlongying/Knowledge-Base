let express = require("express");
let router = express.Router();
let profileController = require("../controllers/ProfileController");

router.get("/profile/:userId", profileController.getProfile);

module.exports = router;
