const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"906700903822-2094shr8ajp9qi090nf6o4e6iaek5lpd.apps.googleusercontent.com",
    clientSecret:"_fGoUxzktOrGKr-yu9MGP4XQ",
    callbackURL:"http://localhost:2000/users/auth/google/callback",
    },
    //refresh token is for that if token expires then we get new token without asking again to user for authentication
    function(accessToken,refreshToken,profile,done){
        //on that profile we choose 1st email so we use array here
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google startegy passport',err);
                return;
            }
            console.log(accessToken,refreshToken);
            console.log(profile);
            
            if(user){
                //if found ,set this user as req.user
                return done(null,user);
            }else{
                //if not found ,create the user and set it is req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('Error in creating user google startegy-passport',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))


module.exports=passport;