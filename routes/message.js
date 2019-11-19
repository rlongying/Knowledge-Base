let express = require("express");
let router = express.Router();
let messageController = require("../controllers/MessageController");

router.get("/list/:userId", messageController.messagePage);

module.exports = router;
