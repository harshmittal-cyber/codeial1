const { use } = require('passport');
const user = require('../models/user');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User profile",
            profile_user:user
        })
    })   
}

module.exports.update=async function(req,res){
  
    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);

            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*******Multer Error:',err)}

                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    //if user avatar is already present then we remove it and update it
                    if(user.avatar){
                        //we need a path module from where we delete the path
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of the uploaded file into the avatr fielf into the user
                    user.avatar=User.avatarPath + '/' + req.file.filename
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized'); 
        return res.status(401).send('Unauthorized');
    }

}

//render the signup page
module.exports.signUp=function(req,res){
    //when user is authenticated then user is not going back to sign up page 
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"codeial | Sign Up"
    })
}

//render the signin page
module.exports.signIn=function(req,res){
    //when user is authenticated then user is not going to sign in page without signout
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | sign In"
    })
}

//get the signup data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirmpassword){
        req.flash('error','Passwords do not match')
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('error',err);
            console.log('error in finding user in signing up');
            return;
        }    
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating a user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success','You have signed up,login to continue!');
            return res.redirect('back');
        }
    })
}

//Sign in and create session for the user
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

//destroy session
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged Out');
    return res.redirect('/')
}
