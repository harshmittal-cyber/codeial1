const express=require('express');
//setting up router
const router=express.Router();
const homecontroller=require('../controllers/homecontroller');
console.log('router loaded');

router.get('/',homecontroller.home);

module.exports=router;