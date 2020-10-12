const express=require('express');
const passport = require('passport');
//setting up router
const router=express.Router();
const commentcontroller=require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,commentcontroller.create);

module.exports=router;