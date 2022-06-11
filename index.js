const express = require('express');
const port = process.env.PORT || 8000;
const app = express();

//use body parser
app.use(express.urlencoded());

//set the router
app.use('/',require('./routes/index'));

//import mongoose configuration
const mongoose = require('./config/mongoose');

//set ejs as template
app.set('view engine','ejs');

app.listen(port,function(err){
    if(err){
        console.log('error in connecting',err);
    }
    console.log('connected');
})