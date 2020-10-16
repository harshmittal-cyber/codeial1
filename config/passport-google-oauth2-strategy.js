const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"906700903822-2094shr8ajp9qi090nf6o4e6iaek5lpd.apps.googleusercontent.com",
    clientSecret:"_fGoUxzktOrGKr-yu9MGP4XQ",
    callbackURL:"https://localhost:2000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        //on that profile we choose 1st email so we use array here
        User.findOne({email:profile.emails[0].value.exec}).exec(function(err,user){
            if(err){
                console.log('Error in google startegy passport',err);
                return;
            }
            console.log(profile);

            if(user){
                return done(null,user);
            }else{
                User.create({
                    name:profile.displayName,
                    email:profile.email,
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