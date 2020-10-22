const express=require('express');
//setting up router
const router=express.Router();

const likescontroller=require('../controllers/likes_controllers');

router.post('/toggle',likescontroller.toggleLike);

module.exports=router;