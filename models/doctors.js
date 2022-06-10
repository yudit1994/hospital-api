const mongoose = require('mongoose');

const doctorschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const doctor = mongoose.model('doctors',doctorschema);
module.exports = doctor;