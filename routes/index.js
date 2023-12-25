const express  = require("express");
const router = express.Router();
const MainController = require("../controller/MainController");

router.get("/contact", MainController.contact);
router.get("/features", MainController.feature);
router.get("/faq", MainController.faq);
router.get("/about", MainController.about);
router.get("/", MainController.home);
router.post("/send-mail", MainController.feedbackForm);
router.post("/newsletterform", MainController.newsLetterUser);

module.exports = router;
