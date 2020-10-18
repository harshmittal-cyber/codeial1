const nodemailer = require('../config/nodemailer');
const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment=(comment) => {
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs')


    nodeMailer.transporter.sendMail({
        from:'harshmittal7852@gmail.com',
        to:comment.user.email,
        subject:"New Comment Published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err)
            return;
        }
// i dont understand the error bro escalating forno w
        console.log('Message sent',info);
        return;
    })
}