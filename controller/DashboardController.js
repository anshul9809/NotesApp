const expressAsyncHandler = require("express-async-handler");

module.exports.home = expressAsyncHandler(async (req,res)=>{
    const locals = {
        title: "Dashboard",
        description: "Notes app"
    };
    return res.render("dashboard/", {
        locals,
        layout: '../views/layouts/dashboard'
    });
});