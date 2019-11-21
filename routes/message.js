let express = require("express");
let router = express.Router();
let messageController = require("../controllers/MessageController");

router.get("/list/:topicId", messageController.messagePage);
router.post("/list/:topicId/send", messageController.messageSend);
module.exports = router;
