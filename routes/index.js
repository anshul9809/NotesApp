const express  = require("express");
const router = express.Router();
const MainController = require("../controller/MainController");
const {checkAuthentication, simpleSite} = require("../middlewares/checkAuth");

router.get("/contact", simpleSite,MainController.contact);
router.get("/features", simpleSite, MainController.feature);
router.get("/faq", simpleSite, MainController.faq);
router.get("/about", simpleSite, MainController.about);
router.post("/send-mail", MainController.feedbackForm);
router.post("/newsletterform", MainController.newsLetterUser);

router.use("/dashboard", require("./dashboardRoutes"));
router.use("/", require("./auth"));
router.get("/", simpleSite, MainController.home);

module.exports = router;
