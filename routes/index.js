const express=require('express');
//setting up router
const router=express.Router();
const homecontroller=require('../controllers/homecontroller');
console.log('router loaded');


//this call homecontroller for response for /
router.get('/',homecontroller.home);

module.exports=router;