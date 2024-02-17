import middleware from '../middlewares/middleware';

const express = require('express');

const router = express.Router();
const StaticPage = require('../controllers/index');
const AppController = require('../controllers/appController');
const ClinicController = require('../controllers/clinicController');
const EmpController = require('../controllers/empController');
const PatientController = require('../controllers/patientController');

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

// get /dashboard
router.get('/dashboard', middleware.requireLogin, ClinicController.getClinic);

// post requests
// post /auth/register
router.post('/auth/register', ClinicController.postNew);

// post /employees
router.post('/employees', EmpController.postNew);

// post /patients
router.post('/patients', PatientController.postNew);

// post /auth/login
router.post('/auth/login', ClinicController.postClinic);

module.exports = router;
