const user = require('../models/user');
const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"My profile"
    })
}

//render the signup page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial | Sign Up"
    })
}

//render the signin page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | sign In"
    })
}

//get the signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirmpassword){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return
        }    
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating a user while signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//Sign in and create session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

