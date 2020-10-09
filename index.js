const express=require('express');
const app=express();
const port=8000;
const expresslayouts=require('express-ejs-layouts');

//using layouts and it is a wrapper of body for which controller is render 
app.use(expresslayouts);


//use express router
//this call router and then router call controller for / then we get a response
app.use('/',require('./routes/index.js'));

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log('Error in running a server',err);
    }
    console.log('server is running on port',port);
})

