const expressAsyncHandler = require("express-async-handler");
const MailController = require("./MailController");
const ContactForm = require("../models/contact");
const NewsLetter = require("../models/newsletter");


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

module.exports.faq = expressAsyncHandler((req,res)=>{
    const locals = {
        title: "FAQs",
        description: "Frequently asked question for notes application"
    };
    return res.render("faq", locals);
});

module.exports.contact = expressAsyncHandler((req,res)=>{
    const locals = {
        title: "Contact us",
        description: "Our contact us page"
    };
    return res.render("contact", locals)
});

module.exports.feature = expressAsyncHandler((req,res)=>{
    const locals = {
        title: "Features",
        description: "Features of the notes application",
    };
    return res.render("features", locals);
});

module.exports.feedbackForm = expressAsyncHandler( async(req,res)=>{
    // console.log(req.body);
    try{
        let contactForm = await new ContactForm(req.body);
        await contactForm.save();
        const completeMessage = `${req.body.email} has sent this message
        </br>
        ${req.body.msg} , </br>
        mobile is "${req.body.phone}"
        Please reply accordingly.`;
        const data = {
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.msg,
            htm: completeMessage,
        };
        let info = MailController.sendMail(data);
        if(info.messageId){
            // req.flash('success','Feedback submitted successfully');
        }
        return res.redirect("/");
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
});


module.exports.newsLetterUser = expressAsyncHandler(async (req,res)=>{
    try{
        const email = req.body.email;
        const alreadySubscribed = await NewsLetter.findOne({email});
        if(alreadySubscribed){
            // res.flash("success", "Already subscribed");
        }
        else{
            alreadySubscribed = await new NewsLetter(req.body);
            await alreadySubscribed.save();
            // res.flash("success","Successfully Subscribed!");
        }
        return res.redirect("/");

    }catch(err){
        console.error(err.message);
        // res.flash("error", "Failed to subscribe, please try again");
        return res.redirect("/");
    }
})