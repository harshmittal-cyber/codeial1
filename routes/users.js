const express=require('express');
const router=express.Router();
const passport=require('passport');
const usercontroller=require('../controllers/user_controller.js');

router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);

router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);

router.post('/create',usercontroller.create);

//use passport as a middleware to authenticate
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usercontroller.createSession);


router.get('/sign-out',usercontroller.destroySession);

//use for google-oauth
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usercontroller.createSession);

module.exports=router;