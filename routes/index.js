const express=require('express');
//setting up router
const router=express.Router();
const homecontroller=require('../controllers/homecontroller');
console.log('router loaded');


//this call homecontroller for response for /
router.get('/',homecontroller.home);
router.use('/users',require('./users'))
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));

module.exports=router;