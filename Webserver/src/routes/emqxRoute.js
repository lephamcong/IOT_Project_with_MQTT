const express = require("express");
const router = express.Router();
const emqxController = require("../app/controllers/EMQXController");

router.post("/ConnectStatus", emqxController.ConnectStatus);
router.post("/Init", emqxController.Init);
router.put("/dataIncoming", emqxController.dataIncoming);

// router.post("/", emqxController.home);

module.exports = router;
