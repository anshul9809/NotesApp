const expressAsyncHandler = require("express-async-handler");


// home page
module.exports.home = expressAsyncHandler(async (req,res)=>{
    const locals = {
        title: "Notes App",
        description: "A simple notes app for you"
    };
    return res.render("index", locals);
});

// about page
module.exports.about = expressAsyncHandler(async (req,res)=>{
    const locals = {
        title: "About us",
        description: "A simple notes app for you"
    };
    return res.render("about", locals);
});