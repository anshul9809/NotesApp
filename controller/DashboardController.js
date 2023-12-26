const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Notes = require("../models/contact");

module.exports.home = expressAsyncHandler(async (req,res)=>{
    try{
        // let perPage = 
    }
    catch(err){
        console.log("error in dashboard home ",err);
        req.flash("error", "Error while fetching data.");
    }
    const locals = {
        title: "Dashboard",
        description: "Notes app"
    };
    return res.render("dashboard/", {

        locals,
        layout: '../views/layouts/dashboard'
    });
});