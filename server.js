require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const methodOverride = require("method-override");

const flashmiddleware = require("./middlewares/flashMiddleware");


const session = require("express-session");
const passport = require("passport");
const MognoStore = require("connect-mongo");
const MongoStore = require('connect-mongo');



const app = express();

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl: process.env.DB_CONNECT,
    }),
    cookie:{maxAge: 3600000},
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));


//setting the flash messages
app.use(flash());
app.use(flashmiddleware.setFlash);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

app.use("/", require("./routes/index"));

app.get("*", (req,res)=>{
    res.status(404).render("404")
});



app.listen(port, (err)=>{
    if(err){
        console.log(`error while running server ${err}`);
    }
    console.log(`server listening at port ${port}`);
    return
});