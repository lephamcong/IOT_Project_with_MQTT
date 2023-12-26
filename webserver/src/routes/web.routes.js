const express = require("express");
const router = express.Router();
const webcontroller = require("../app/controllers/WebController");

// router.get("/:slug", webcontroller.home);
router.get("/contact", webcontroller.contact);
router.get("/dashboard/:_id", webcontroller.dashboard);
router.post("/maintenance/:_id", webcontroller.maintenance);
router.get("/", webcontroller.home);

module.exports = router;
