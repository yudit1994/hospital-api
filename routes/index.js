const express = require('express');
const router = express.Router();
const homecontroller = require('../controller/homecontroller');


//get the home page
router.get('/',homecontroller.home);

//get the register page
router.get('/register-page',homecontroller.registerpage);

//register the doctor
router.post('/doctors/register',homecontroller.registerdoctor);

//get the register page on refershing the page
router.get('/doctors/register',homecontroller.registerpage);

//login of doctor 
router.post('/doctors/login', homecontroller.doctorslogin);

//show the login page onrefresh
router.get('/doctors/login', homecontroller.doctorslogin2);


//checking the patient in the existing records 
router.post('/patients/check',homecontroller.checkpatient);

router.get('/patients/check',homecontroller.checkpatient2);

//register the patient 
router.post('/patients/register',homecontroller.patientregister);

router.get('/patients/register',homecontroller.checkpatient2);


//create report of th patient
router.post('/patients/:id/create_report',homecontroller.createreport);

router.get('/patients/:id/create_report',homecontroller.checkpatient2);

//show status page
router.get('/patients/status-page',homecontroller.statuspage);

//shows the status
router.post('/reports/status',homecontroller.status);

router.get('/reports/status',homecontroller.statuspage);


module.exports = router;