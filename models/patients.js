const mongoose = require('mongoose');

const patientschema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    report:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reports'
    }]
});
const patient = mongoose.model('patient',patientschema);
module.exports = patient;