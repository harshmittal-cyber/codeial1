const mongoose=require('mongoose');

//connnect to database
mongoose.connect('mongodb://localhost/codeial_development1');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDb"));

//once database is open
db.once('open',function(){
    console.log('Connected to database::MongoDb');
})

module.exports=db;