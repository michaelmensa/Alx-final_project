import middleware from '../middlewares/middleware';

const express = require('express');

const router = express.Router();
const StaticPage = require('../controllers/index');
const AppController = require('../controllers/appController');
const ClinicController = require('../controllers/clinicController');
const EmpController = require('../controllers/empController');
const PatientController = require('../controllers/patientController');
const ExamController = require('../controllers/examController');

// router.use('/clinic') requires clinic login
router.use('/clinic', middleware.requireClinicLogin);
// define routes for /clinic/dashboard
// get /clinic/dashboard routes
router.get('/clinic/dashboard', ClinicController.getClinic);
router.get('/clinic/dashboard/stats', ClinicController.getStats);
router.get('/clinic/dashboard/employees/:id', EmpController.getShow);
router.get('/clinic/dashboard/employees', EmpController.getIndex);
router.get('/clinic/dashboard/patients', PatientController.getIndex);
router.get('/clinic/dashboard/patients/:id', PatientController.getShow);
router.get('/clinic/dashboard/login', ClinicController.getEmployeeLogIn);
// get /clinic/dashboard/create creates new employee
router.get('/clinic/dashboard/create', ClinicController.getEmployeeForm);
// post /clinic/dashboard/employees
router.post('/clinic/dashboard/create', EmpController.postNew);
router.post('/clinic/dashboard/login', EmpController.postEmployeeLogIn);
// post /clinic/dashboard/logout to log out clinic
router.post('/clinic/dashboard/logout', AppController.postLogOut);

// router.use('/employee/dashboard') all requires employee login
router.use('/employee', middleware.requireEmployeeLogin);
router.get('/employee/dashboard', EmpController.getEmployee);
router.get('/employee/dashboard/stats', PatientController.getStats);
router.get('/employee/dashboard/patients', PatientController.getIndex);
router.get('/employee/dashboard/patients/:id', PatientController.getShow);
// get /employee/dashboard/create to get add patient form
router.get('/employee/dashboard/create', PatientController.getPatientForm);
// post /emplpyee/dashboard/create to create new patient
router.post('/employee/dashboard/create', PatientController.postNew);
// post /employee/dashboard/logout to log out clinic
router.post('/employee/dashboard/logout', EmpController.postLogOut);

// routes for checking in a patient and examination. both requires employee login
router.use('/patients', middleware.requireEmployeeLogin);
router.get('/patients', PatientController.getPatients);
// post /patients/:id
router.post('/patients/:id', ExamController.postExamForm);
// get /patients/:id
router.get('/patients/:id', ExamController.getExamForm);

// routes that are not protected
// get /home
router.get('/', StaticPage.getHome);
// get /about
router.get('/about', StaticPage.getAbout);
// get /contact
router.get('/contact', StaticPage.getContact);
// get /services
router.get('/services', StaticPage.getServices);
// get /blog
router.get('/blog', StaticPage.getBlog);
// get /single
router.get('/single', StaticPage.getSingleBlog);
// get /stats
router.get('/stats', AppController.getStats);
// get /auth/register to get register new clinic page
router.get('/register', AppController.getSignUp);
// get /auth/login to get log in page after clinic has been registered
router.get('/login', AppController.getLogIn);

// post requests
// post /auth/register to register clinic
router.post('/register', ClinicController.postNew);
// post /auth/login to log in to clinic dashboard
router.post('/login', ClinicController.postClinic);
// post /patients to create patients
router.post('/patients', PatientController.postNew);

// get /tryagain
router.get('/tryagain', ClinicController.getTryAgain);

module.exports = router;
