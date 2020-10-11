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
    },
    //include the arrays of ids of all comments in this post schema itself
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

//export the schema
module.exports=Post;0