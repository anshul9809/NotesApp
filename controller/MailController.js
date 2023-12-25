const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");

module.exports.sendMail = expressAsyncHandler(async (data,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
    });
    console.log("i'm here");
    async function main() {
        const info = await transporter.sendMail({
          from: '"Hello 👻 notes team"', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        }, (err, info)=>{
          if(err){
            console.log("errir mail, ",err)
          }
          else{
            console.log("message sent ", info);
          }
        });
    }
    main();
});