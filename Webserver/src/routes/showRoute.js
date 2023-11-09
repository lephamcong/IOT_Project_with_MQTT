const express = require("express");
const router = express.Router();
const showController = require("../app/controllers/ShowController");

router.get("/:slug", showController.home);
// router.post("/", showController.home);

module.exports = router;
