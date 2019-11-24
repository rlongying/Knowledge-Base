let express = require("express");
let router = express.Router();
let loginController = require("../controllers/LoginController");

router.get("/", loginController.loginPage);
router.post("/signUp", loginController.registerPage);
router.post("/register", loginController.register);

module.exports = router;
