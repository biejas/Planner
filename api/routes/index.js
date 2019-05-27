var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlEnroll = require('../controllers/enrollment');
var ctrlAdmin = require('../controllers/adminpanel');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//enrollment
router.get('/courses', ctrlEnroll.courses);
router.put('/courses', ctrlAdmin.deleteCourse);
router.post('/enroll', ctrlEnroll.enroll);

//adminpanel
router.get('/admin', auth, ctrlAdmin.adminRead);
router.post('/admin', ctrlEnroll.finishEnrollment);
router.put('/admin', ctrlEnroll.startEnrollment);

router.post('/subjects', ctrlAdmin.addSubject);
router.put('/subjects', ctrlAdmin.deleteElement);
router.get('/subjects', ctrlAdmin.getEnrollmentResult);

module.exports = router;
