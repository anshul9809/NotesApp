const express  = require("express");
const router = express.Router();
const MainController = require("../controller/MainController");

// router.get("/contact", MainController.contact);
router.get("/about", MainController.about);
router.get("/", MainController.home);

module.exports = router;
