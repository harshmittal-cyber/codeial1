const express=require('express');
const passport = require('passport');
//setting up router
const router=express.Router();
const postcontroller=require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postcontroller.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontroller.destroy);

module.exports=router;