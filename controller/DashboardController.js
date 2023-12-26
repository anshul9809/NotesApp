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
        userName: req.user.firstName,
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


module.exports.updateNote = expressAsyncHandler(async (req,res)=>{
    const user = req.user._id;
    const noteId = req.params.id;
    const {title, body} = req.body;
    try{
        const note = await Note.findByIdAndUpdate({_id: noteId}, {title, body})
        .where({user: user});
        if(note){
            req.flash("success", "Note Updated Successfully");
            return res.redirect("/dashboard");
        }
    }catch(err){
        req.flash("error", "Something went wrong, please try again");
        return res.redirect("back");
    }
});

module.exports.deleteNote = expressAsyncHandler(async (req,res)=>{
    const noteId = req.params.id;
    try {
        let deletedNote = await Note.deleteOne({ _id: noteId }).where({ user: req.user.id });
        if(deletedNote){
            req.flash("success", "Note deleted Successfully");
            return res.redirect("/dashboard");
        }
        else{
            req.flash("error", "Unable to delete note");
            return res.redirect("back");
        }
      } catch (error) {
        console.log(error);
      }
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
                userName: req.user.firstName,
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

module.exports.searchNote = expressAsyncHandler(async (req,res)=>{
    try{
        const locals = {
            title: "Search",
            description: "Note app search",
        };
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const searchResults = await Note.find({
            $or: [
            { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
            ],
        }).where({ user: req.user.id });
    
        return res.render("dashboard/search", {
            userName: req.user.firstName,
            locals,
            searchResults,
            layout: "../views/layouts/dashboard",
        });

    }
    catch(err){
        req.flash("error", "Something is wrong, please check later");
        return res.redirect("/dashboard");
    }
});