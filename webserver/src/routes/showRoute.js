const express = require("express");
const router = express.Router();
const showController = require("../app/controllers/ShowController");

// router.get("/:slug", showController.home);
router.get("/contact", showController.contact);
router.get("/dashboard", showController.dashboard);
router.get("/", showController.home);

module.exports = router;
