const mongoose=require('mongoose');

//creating a schema for post
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

//export the schema
module.exports=Post;