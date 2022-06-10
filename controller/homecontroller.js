const doctors = require('../models/doctors');
const patient = require('../models/patients');
const report = require('../models/report');
const jwt = require('jsonwebtoken');

var token = '';

//returns the homepage
module.exports.home = function(req,res){
    res.render('home',{
        not:0
    });
}

//return the register doctor page
module.exports.registerpage = function(req,res){
    res.render('registerdoctor',{
        not:0
    });
}

//registers the doctor
module.exports.registerdoctor = function(req,res){

    doctors.create({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password
    },function(err,doctor){
        if(err){
            console.log('error in registering doctor',err);
            return res.render('registerdoctor',{
                not:1
            });
        }
        if(doctor){
           return res.render('home',{
             not:3
           });
        }
        else{
            return res.render('registerdoctor',{
                not:1
            });
        }
    })
}

//doctor login
module.exports.doctorslogin = async function(req,res){
   
    let Doctor = await doctors.findOne({name:req.body.username});
    
    if(!Doctor || Doctor.password != req.body.password){
        return res.render('home',{
            not:2
        });
    }

    //creates the jwt token with secretskey 'hopsital' and expires in 1000sec
    token = jwt.sign(Doctor.toJSON(),'hospital',{expiresIn:'1000000'});

    return res.render('patients',{
               a:0
               });
    
    
}

//doctor login refresh
module.exports.doctorslogin2 = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
        return res.render('patients',{
            a:0
            });
        }
        else{
            return res.render('home',{
                not:1
            });
        }
      });
}

//check if patient is registered
module.exports.checkpatient = function(req,res){
    
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
           
        }
        else{
            return res.render('home',{
                not:1
            }); 
        }
      });
    
    
    patient.findOne({phone:req.body.phone}).populate('report')
    .exec(function(err,patients){
        if(err){
            console.log('error in finding patient',err);
            return;
        }
        if(patients){
         
          //sorting array records based on dates of reports
          for(var k=0; k< patients.report.length; k++){
            for(var l=k+1; l< patients.report.length; l++){
                 if(patients.report[k].date > patients.report[l].date){
                     var temp = patients.report[k];
                     patients.report[k] = patients.report[l];
                     patients.report[l] = temp;
                 }
            }
          }
          res.render('patients',{
              patient:patients,
              a:1
          })
        }
        else{
          res.render('patients',{
              a:2,
              b:1
          })
        }
    })
    
    
}

//on refresh check patient
module.exports.checkpatient2 = function(req,res){

    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
            return res.render('patients',{
                a:0
              });
        }
        else{
            return res.render('home',{
                not:1
            });
        }
      });
      
}

//patients register
module.exports.patientregister = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){            
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
            patient.create({
                name:req.body.name,
                age:req.body.age,
                place:req.body.place,
                phone:req.body.phone
            },function(err1,patients){
                if(err1){
                    console.log('error in registering patient',err1);
                    return res.render('patients',{
                        patient:patients,
                        a:2,
                        b:2
                    }) 
                }
                if(patients){
                res.render('patients',{
                    patient:patients,
                    a:1
                })
                }
                else{
                    res.render('patients',{
                        patient:patients,
                        a:2,
                        b:2
                    }) 
                }
            });
        }
        else{
           return res.render('home',{
                not:1
            });
        }
      });
    
}

//create report of patient
module.exports.createreport = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            
            return res.render('home',{
                not:1
            });
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
                    
                    return res.render('patients',{
                        a:4
                    }); 
                     
                }
                if(report){
                patient.findOne({_id:req.params.id},function(err,patient1){
                    if(err){
                        console.log('error in finding patient to add report',err);
                        return;
                    }
                    patient1.report.push(report);
                    patient1.save();
                })
                return res.render('patients',{
                    a:3
                  });
                }
               else{
                return res.render('patients',{
                    a:4
                  });
               }
            })
        }
        else{
            return res.render('home',{
                not:1
            }); 
        }
      });
    
}

//shows status page
module.exports.statuspage = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
            res.render('status',{
                a:0
            });
        }
        else{
            return res.render('home',{
                not:1
            });
        }
      });
    
}

//displays the slected status
module.exports.status = function(req,res){
    jwt.verify(token, 'hospital', function(err, decoded) {
        if (err) {
          
         if(err.name=='TokenExpiredError'){
            
            return res.render('home',{
                not:1
            });
         }
        }
        if(decoded){
            report.find({status:req.body.status}).populate('patient')
            .exec(function(err,statuss){
                if(err){
                    console.log('error in finding',err);
                    return;
                }
                for(var k=0; k< statuss.length; k++){
                    for(var l=k+1; l< statuss.length; l++){
                         if(statuss[k].date > statuss[l].date){
                             var temp = statuss[k];
                             statuss[k] = statuss[l];
                             statuss[l] = temp;
                         }
                    }
                  }
                res.render('status',{
                    status:statuss,
                    a:1
                })
            })
        }
        else{
            return res.render('home',{
                not:1
            });
        }
      });
    
    
}