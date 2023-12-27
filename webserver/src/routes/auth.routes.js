const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");

router.get("/login", authController.loginPage);
router.post("/login", authController.login);
router.get("/register", authController.registerPage);
router.post("/register", authController.register);

// router.post("/", emqxController.home);

module.exports = router;
