const express = require('express');
const router = express.Router();
const StaticPage = require('../controllers/index');

// get /home
router.get('/', StaticPage.getHome);

// get /about
router.get('/about', StaticPage.getAbout);

// get /contact
router.get('/contact', StaticPage.getContact);

module.exports = router;