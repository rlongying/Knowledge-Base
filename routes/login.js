let express = require("express");
let router = express.Router();
let loginController = require("../controllers/loginController");

router.get("/", loginController.loginPage);
router.get("/register", loginController.registerPage);

module.exports = router;
