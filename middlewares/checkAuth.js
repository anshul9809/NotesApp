module.exports.checkAuthentication = (req,res, next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        // res.flash("error","Please login");
        console.log("not authenticated");
        return res.redirect("/");
    }
}

module.exports.simpleSite = (req,res, next)=>{
    if(!req.isAuthenticated()){
        next();
    }
    else {
        return res.redirect("/dashboard");
    }
}