const mongoose = require('mongoose');

const db= mongoose.connection;


mongoose.connect('mongodb://localhost:27017/hospital-api');

module.exports=db;