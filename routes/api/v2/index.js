const express=require('express');
//setting up router
const router=express.Router();

router.use('/posts',require('./post'));
module.exports=router;