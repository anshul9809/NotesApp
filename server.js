require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");



const app = express();

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