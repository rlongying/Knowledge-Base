let express = require("express");
let router = express.Router();
let messageController = require("../controllers/MessageController");

router.get("/list/:userId", messageController.messagePage);
router.get("/list/:userId/:topicId", messageController.messagePage);
router.post("/list/:userId/:topicId/send", messageController.messageSend);
module.exports = router;
