const express = require('express');

const router = express.Router();
const StaticPage = require('../controllers/index');
const AppController = require('../controllers/appController');
const ClinicController = require('../controllers/clinicController');

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

// post /clinics
router.post('/clinics', ClinicController.postNew);

module.exports = router;
