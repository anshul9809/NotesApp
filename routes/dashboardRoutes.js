const express  = require("express");
const router = express.Router();
const DashboardController = require("../controller/DashboardController");
const {checkAuthentication} = require("../middlewares/checkAuth"); 

router.get("/",  checkAuthentication, DashboardController.home);

module.exports = router;