const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//mongo store and it require session argument which is in bracket
const MongoStore=require('connect-mongo')(session);

//node-sass-middleware
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))

//middleware
app.use(express.urlencoded());
app.use(cookieParser());



//use assets
app.use(express.static('./assets'));

//using layouts and it is a wrapper of body for which controller is render 
app.use(expresslayouts);

//extract style and script from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

//use for session cookie to encrypt the cookie
//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //todo chenge the secret before deployement in production mode
    secret:'blasomething',
    //if identity is not established means not login then so it wont store the extra data
    saveUninitialized:false,
    //when identity is established it dont resave if any changes is not done
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //use mongo store for storing cookie
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        //in case connection is not established
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

//need to tell to use the passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

//use express router.Put this after passport middleware
//this call router and then router call controller for / then we get a response
app.use('/',require('./routes/index.js'));


app.listen(port,function(err){
    if(err){
        console.log('Error in running a server',err);
    }
    console.log('server is running on port',port);
})

