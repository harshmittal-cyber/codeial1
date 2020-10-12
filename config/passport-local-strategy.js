const passport=require("passport");
const User = require("../models/user");

const LocalStrategy=require('passport-local').Strategy;

//authentication using passport
//find this on google on passportjs.org
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            //if user not found or password not matches
            if(!user || user.password !=password){
                req.flash('error','Invalid Username/Password');
                //false means authentication is not done yet
                return done(null,false)
            }
            //user found
            return done(null,user);
        })
    }
))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user-->Passport');
            return done(err)
        }
        //user is found
        return done(null,user)
    })
})

//check if the user is authenticated
passport.checkAuthentication= function(req,res,next){
    //if the user is signed in,then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in 
    return res.redirect('/users/sign-in');
}

//when a req is come then it check this function wheher user is login or not
passport.setAuthenticated=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie ans we are just sending to the locals for thr views
        res.locals.user=req.user;
    }
    next();
}


module.exports=passport;