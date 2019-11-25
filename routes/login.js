let express = require("express");
let router = express.Router();
let loginController = require("../controllers/LoginController");

router.get("/", loginController.loginPage);
router.post("/", loginController.logout);
router.post("/login", loginController.login);
router.post("/signUp", loginController.registerPage);
router.post("/register", loginController.register);
router.post("/logout", loginController.logout)

module.exports = router;
