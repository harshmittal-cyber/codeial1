const express=require('express');
//setting up router
const router=express.Router();

router.use('/posts',require('./post'));
router.use('/users',require('./users'));

module.exports=router;