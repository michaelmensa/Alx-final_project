import middleware from '../middlewares/middleware';

const express = require('express');

const router = express.Router();
const StaticPage = require('../controllers/index');
const AppController = require('../controllers/appController');
const ClinicController = require('../controllers/clinicController');
const EmpController = require('../controllers/empController');
const PatientController = require('../controllers/patientController');

// router.use('/dashboard') requires clinic login
router.use('/clinic', middleware.requireClinicLogin);
// define routes for /dashboard
// get /dashboard routes
router.get('/clinic/dashboard', ClinicController.getClinic);
router.get('/clinic/dashboard/stats', ClinicController.getStats);
router.get('/clinic/dashboard/employees/:id', EmpController.getShow);
router.get('/clinic/dashboard/employees', EmpController.getIndex);
router.get('/clinic/dashboard/loginemployee', EmpController.getEmployeeLogIn);
// post /dashboard/employees
router.post('/clinic/dashboard/employees', EmpController.postNew);
router.post('/clinic/dashboard/loginemployee', EmpController.postEmployeeLogIn);
// post /dashboard/logout to log out clinic
router.post('/clinic/dashboard/logout', AppController.postLogOut);

// router.use('/dashboard/employee/dashboard') all requires employee login
router.use('/employee', middleware.requireEmployeeLogin);
router.get('/employee/dashboard', EmpController.getEmployee);
router.post('/employee/dashboard/logout', EmpController.postLogOut);

// routes that are not protected
// get /home
router.get('/', StaticPage.getHome);
// get /about
router.get('/about', StaticPage.getAbout);
// get /contact
router.get('/contact', StaticPage.getContact);
// get /status
router.get('/status', AppController.getStatus);
// get /stats
router.get('/stats', AppController.getStats);
// get /auth/register to get register new clinic page
router.get('/auth/register', AppController.getSignUp);
// get /auth/login to get log in page after clinic has been registered
router.get('/auth/login', AppController.getLogIn);

// post requests
// post /auth/register to register clinic
router.post('/auth/register', ClinicController.postNew);
// post /auth/login to log in to clinic dashboard
router.post('/auth/login', ClinicController.postClinic);
// post /patients to create patients
router.post('/patients', PatientController.postNew);

module.exports = router;
