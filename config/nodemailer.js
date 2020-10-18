const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

//this path send mails
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    post:587,
    secure:false,
    auth:{    
        user:'harshmittal7852',
        pass:'codingninjas'
    }
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template',err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}