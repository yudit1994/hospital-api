const doctors = require('../models/doctors');
const patient = require('../models/patients');
const report = require('../models/report');
const jwt = require('jsonwebtoken');

var token = '';

//registers the doctor
module.exports.registerdoctor = function(req,res){
    
    doctors.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    },function(err,doctor){
        if(err){
            console.log('**',err);
            return res.status(500).send('not createdddd');
        }
        if(doctor){
            return res.status(200).send('created successfully');
        }
        else{
            return res.status(500).send('not created');
        }
    })
}

//doctor login
module.exports.doctorslogin = async function(req,res){
   
    let Doctor = await doctors.findOne({name:req.body.name});
    
    if(!Doctor || Doctor.password != req.body.password){
        return res.status(500).send('not logged in');
    }

    //creates the jwt token with secretskey 'hopsital' and expires in 1000sec
    token = jwt.sign(Doctor.toJSON(),'hospital',{expiresIn:'100000000'});

    return res.status(200).send({
        message:'logged in successfully',
        TOKEN: token
    });
    
    
}


//patients register
module.exports.patientregister = function(req,res){
    try{
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){            
            return res.status(500).send('Token expired , login again');
         }
        }
        if(decoded){
           console.log('request',req.body);
           patient.find({phone:req.body.phone},function(err,patient){
             if(err){
                return res.status(500).send('error in creating patient'); 
             }
             if(patient){
                console.log('found');
                return res.status(200).send(patient); 
             }
             else{
                patient.create({
                    name:req.body.name,
                    age:req.body.age,
                    place:req.body.place,
                    phone:req.body.phone
                },function(err1,patients){
                    if(err1){
                        console.log('**',err1);
                        return res.status(500).send('error in creating patient'); 
                    }
                    if(patients){
                        return res.status(200).send({
                            message:'patient created',
                            patient:patients.name
                        });
                    }//if
                    else{
                        return res.status(500).send('not created patient');
                    }//else
                });
             }
             
           })
            
        }//decoded
        else{
            return res.status(500).send('Token expired , login again');
        }
     });//jwt
    }
    catch(err){
        console.log('error',err);
    }
    
}

//create report of patient
//**********date format YYYY-MM-DD*******//
module.exports.createreport = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            return res.status(500).send('Token expired , login again');
            
         }
         
        }
        if(decoded){
        
            report.create({
                doctor:req.body.doctor,
                status:req.body.status,
                date:req.body.date,
                patient:req.params.id
            },function(err,report){
                if(err){
                    console.log('***',err);
                    return res.status(500).send('error in created report'); 
                     
                }
                if(report){
                patient.findOne({_id:req.params.id},function(err,patient1){
                    if(err){
                        console.log('**',err);
                        return res.status(500).send('error in creating patient report');
                    }
                    patient1.report.push(report);
                    patient1.save();
                })
                return res.status(500).send('created patient report');
                }
               else{
                return res.status(500).send('report not created');
               }
            })
        }
        else{
            return res.status(500).send('Token expired , login again');
        }
      });
    
}


//displays the slected status
module.exports.reports = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            return res.status(500).send('Token expired , login again');
         }
        }
        if(decoded){
            
            patient.find({_id:req.params.id}).populate('report')
            .exec(function(err,patient){
                if(err){
                    console.log('error in creating',err);
                    res.status(500).send('error in find reports');
                }
                if(patient){
                    
                    for(var k=0; k< patient[0].report.length; k++){
                        for(var l=k+1; l< patient[0].report.length; l++){
                             if(patient[0].report[k].date > patient[0].report[l].date){
                                 var temp = patient[0].report[k];
                                 patient[0].report[k] = patient[0].report[l];
                                 patient[0].report[l] = temp;
                             }
                        }
                      }
                      console.log(patient[0].report);
                    res.status(200).send(patient[0].report);
                }
                else{
                    res.status(500).send('no user exists');
                }
            })
        }
        else{
            return res.status(500).send('Token expired , login again'); 
        }
      });
    
    
}

module.exports.status = function(req,res){
    report.find({status:req.params.status},function(err,report){
        if(err){
            console.log('error in finding report',err);
            res.status(500).send('error in finding reports');
        }
        if(report){
            return res.status(200).send(report);
        }
        else{
            return res.status(500).send('no reports exists');
        }
    })
}