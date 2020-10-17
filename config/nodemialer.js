const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

//this path send mails
let transporter=nodemailer.createTransport({
    service:'gmail',
    post:587,
    secure:false,
    auth:{
        user:'mittalharsh4321@gmail.com',
        pass:'erharsh8492'
    }
});

//ejs
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering template');
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