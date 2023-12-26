const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Note = require("../models/notes");
const mongoose = require("mongoose");
module.exports.home = expressAsyncHandler(async (req,res)=>{
    try{
        const locals = {
            title: "Dashboard",
            description: "Notes app"
        };
        let perPage = 6;
        let page = req.query.page || 1;

        //starting the pagination with the notes
        const notes = await Note.aggregate([
            { $sort: { updatedAt: -1 } },
            { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
            {
              $project: {
                title: { $substr: ["$title", 0, 30] },
                body: { $substr: ["$body", 0, 100] },
              },
            }
            ])
          .skip(perPage * page - perPage)
          .limit(perPage)
          .exec(); 
      
          const count = await Note.countDocuments({});
      
          res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: "../views/layouts/dashboard",
            current: page,
            pages: Math.ceil(count / perPage)
          });
    }
    catch(err){
        console.log("error in dashboard home ",err);
        req.flash("error", "Error while fetching data.");
    }
});

module.exports.showCreateNote = expressAsyncHandler(async (req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","please login");
        return res.redirect("/")
    }
    const locals = {
        title:"Add new Note",
        description: "Nodes note app"
    }
    return res.render("dashboard/create-note",{
        locals,
        layout: "../views/layouts/dashboard",
    })
});

module.exports.createNewNote = expressAsyncHandler(async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const user = req.user._id;
            const {title, body} = req.body;
            let newNote = await Note.create({user, title, body});
            if(newNote){
                req.flash("success","Successfully created a new note!");
                return res.redirect("/dashboard");
            }
            else{
                throw new Error("error in creating note");
            }
        }
        catch(err){
            console.log("error while createing note ", err);
            req.flash("error", "Error while creating new note");
            return res.redirect("/dashboard");
        }
    }
});


module.exports.showEditNote = expressAsyncHandler(async (req,res)=>{
    const locals = {
        title:`Edit Note`,
        description: `This is the edit page`
    };
    return res.render("dashboard/edit-note", {
        locals,
        layout: "../views/layouts/dashboard",
    });
});

module.exports.viewNote = expressAsyncHandler(async (req,res)=>{
    if(req.isAuthenticated()){
        const locals = {
            title: "View note",
            description: "Notes App",
        };
        const id = req.params.id;
        // find the note with given ID and populate it with its author's data
        let note = await Note.findById(id)
        .where({user: req.user._id}).lean();
        if(note){
            return res.render("dashboard/view-note", {
                locals,
                note,
                layout: "../views/layouts/dashboard",
            });
        }
        else{
            req.flash("error", "Unable to find the note");
            return res.redirect("/dashboard");
        }

    }
    else{
        req.flash("error", "Please Login");
        return res.redirect('/');
    }
});