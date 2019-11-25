let express = require("express");
let router = express.Router();
let messageController = require("../controllers/MessageController");

const checkuser = (req, res, next) => {
    let currentUser = req.session.user.id
    let requestUser = req.params.userId

    console.log(req);
    // console.log(requestUser);
    if(currentUser != requestUser){
       return res.redirect("/messages/list/"+currentUser)
    }
    next()
}

router.get("/list/:userId", checkuser, messageController.messagePage);
router.get("/list/:userId/:topicId", checkuser, messageController.messagePage);
router.post("/list/:userId/:topicId/send", checkuser, messageController.messageSend);
module.exports = router;
