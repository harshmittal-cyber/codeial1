const express=require('express');
const router=express.Router();

const usercontroller=require('../controllers/user_controller.js');

router.get('/profile',usercontroller.profile);

module.exports=router;