const express = require("express");
const router = express.Router();
const webcontroller = require("../app/controllers/WebController");
const authMiddleware = require("../middlewares/authMiddleware");

// router.get("/:slug", webcontroller.home);
router.get("/contact", webcontroller.contact);
router.get("/list", authMiddleware.verifyToken, webcontroller.list);
router.get(
  "/dashboard/:_id",
  authMiddleware.verifyToken,
  webcontroller.dashboard
);
router.post(
  "/maintenance/:_id",
  authMiddleware.verifyToken,
  webcontroller.maintenance
);
router.get("/table/:_id", authMiddleware.verifyToken, webcontroller.table);
router.get("/", authMiddleware.verifyToken, webcontroller.about);

// router.get("/", webcontroller.home);

module.exports = router;
