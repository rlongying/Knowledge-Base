let express = require("express");
let router = express.Router();
let messageController = require("../controllers/MessageController");

router.get("/message/list", messageController.messagePage);

module.exports = router;
