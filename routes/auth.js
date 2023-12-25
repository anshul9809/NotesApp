const express  = require("express");
const router = express.Router();
const User = require("../models/user");


const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL
  },
  async function(accessToken, refreshToken, profile, cb) {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImg: profile.photos[0].value
    };
    try{
        let user = await User.findOne({googleId: profile.id});
        if(user){
            cb(null, user);
        }
        else{
            user = await User.create(newUser);
            user.save();
            cb(null, user);
        }
    }catch(err){
        console.log("error is ", err);
        // res.flash("error", "Something went wrong");
    }
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }),
  ()=>{
    console.log("authentication");
  });

router.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect:"/dashboard",
    
    // successFlash: "Logged in successfully",
    // failureFlash: "Error while logging in"
    }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
});


//save user data in db after authentication
passport.serializeUser(function(user,done){
    done(null, user.id)
});

//retrieve user data from session
passport.deserializeUser(function(id,done){
    let user = User.findById(id);
    done(null, user);
});

router.get("/logout", async (req,res)=>{
    req.session.destroy((error)=>{
        if(error){
            console.log("error while logout ", error);
            // res.flash("error", "Faied to logout");
        }
        else{
            // res.flash("success", "Logged Out Successfully");
            res.redirect("/");
        }
    })
});



module.exports = router;