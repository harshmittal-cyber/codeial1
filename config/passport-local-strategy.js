const passport=require("passport");
const User = require("../models/user");

const LocalStrategy=require('passport-local').Strategy;

//authentication using passport
//find this on google on passportjs.org
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user-->Passport');
                return done(err);
            }
            //if user not found or password not matches
            if(!user || user.password !=password){
                console.log('Invalid Username Password');
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

module.exports=passport;