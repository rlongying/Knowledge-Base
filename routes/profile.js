let express = require("express");
let router = express.Router();
let profileController = require("../controllers/ProfileController");

router.get("/profile/:userId", profileController.getProfile);
router.get("/profile/:userId/message", profileController.sendMessageView);
router.post("/profile/:userId", profileController.likeUser);
router.post("/profile/:userId/send", profileController.sendMessage);

module.exports = router;
