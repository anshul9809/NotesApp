const express  = require("express");
const router = express.Router();
const DashboardController = require("../controller/DashboardController");
const {checkAuthentication} = require("../middlewares/checkAuth"); 


router.get("/create-note", checkAuthentication, DashboardController.showCreateNote);
router.post("/create-note", checkAuthentication, DashboardController.createNewNote);
router.put("/update-note/:id", checkAuthentication, DashboardController.showEditNote);
router.get("/view-note/:id", checkAuthentication, DashboardController.viewNote);
router.get("/", checkAuthentication, DashboardController.home);
// router.post("/update-note");
module.exports = router;