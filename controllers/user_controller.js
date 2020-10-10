module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"My profile"
    })
}

//render the signup page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"codeial | Sign Up"
    })
}

//render the signin page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | sign In"
    })
}

//get the signup data
module.exports.create=function(req,res){
    //TODO LATER
}

//get the signin data
module.exports.createSession=function(req,res){
    //TODO LATER
}

