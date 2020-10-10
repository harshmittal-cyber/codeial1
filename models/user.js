const mongoose=require('mongoose');

//creating a schema
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }

},{//use for created at and updated at in database
    timestamps:true
});

const user=mongoose.model('User',userschema);

module.exports=user;