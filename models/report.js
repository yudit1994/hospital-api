const mongoose = require('mongoose');

const reportschema = mongoose.Schema({
    doctor:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ['Negative', 'Travelled-Quarantine','Symptoms-Quarantine',
               'Positive-Admit'],
        required:true
    },
    date:{
        type:String,
        required:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    }
});
const reports = mongoose.model('reports',reportschema);
module.exports = reports;