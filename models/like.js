const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId   
    },
    //this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'
    },
    //this field is used for definning the type of liked object since it is a dynamic reference
    onModel:{
        type:String,
        required:true,
        //enum tells us that like could be on post or comment not other than this
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;