let express = require("express");
let router = express.Router();
let loginController = require("../controllers/LoginController");

router.get("/", loginController.loginPage);
router.get("/signUp", loginController.registerPage);

module.exports = router;
