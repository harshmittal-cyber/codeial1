const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');


//Adding async
module.exports.home= async function(req,res){
    //console.log(req.cookies);
    //res.cookie('user_id',25);
    //populate the user of each post
   try{
        //1st it will execute then other will execute
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
            path:'user'
            }
        });
        //after first await it will executed
        let users= await User.find({});

        
        return res.render('home',{
            title:"Codeial | Home",
            posts:posts,
            all_users:users
            })
        }catch(err){
            console.log('Error',err);
            return;
        }
    }  
    // .exec(function(err,posts){
    // })


//using then
//Post.fu=ind({}).populate('comments').then(function());

//let posts=Post.fu=ind({}).populate('comments').exec();

//posts.then()

