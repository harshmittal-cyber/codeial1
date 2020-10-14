const Post = require('../models/post')
const Comment=require('../models/comment');

module.exports.create =async function(req, res){
    try{
        let post=await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:'Post Created!'
        });
    }
        req.flash('success','Post Created');
        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
}

module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //We have to check whether the same user is deleeting post or not
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post:req.params.id});
            //for ajax call
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                })
            }

            req.flash('success','Post Deleted')
            return res.redirect('back');
            //if user is not matched
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
    }
}
    
    