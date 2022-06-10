const mongoose = require('mongoose');

const reportschema = mongoose.Schema({
    doctor:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    }
});
const reports = mongoose.model('reports',reportschema);
module.exports = reports;