const express = require('express');
const router = express.Router();
const homecontroller = require('../controller/homecontroller');


//register the doctor
router.post('/doctors/register',homecontroller.registerdoctor);


//login of doctor 
router.post('/doctors/login', homecontroller.doctorslogin);


//register the patient 
router.post('/patients/register',homecontroller.patientregister);


//create report of the patient
router.post('/patients/:id/create_report',homecontroller.createreport);


//display all the reports of the patient
router.get('/patients/:id/all_report',homecontroller.reports);


//display all the reports with status
router.get('/reports/:status',homecontroller.status);


module.exports = router;