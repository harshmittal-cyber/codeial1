const mongoose=require('mongoose');
const multer=require('multer');
//used for where file path is
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatar');

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
    },
    avatar:{
        type:String
    }

},{//use for created at and updated at in database
    timestamps:true
});

//multer npm code from documentation
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static
//single is used for only 1 file is uploaded at instance
userschema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');

//made this AVATAR_PATH publically available
userschema.statics.avatarPath=AVATAR_PATH;  


const User=mongoose.model('User',userschema);

module.exports=User;