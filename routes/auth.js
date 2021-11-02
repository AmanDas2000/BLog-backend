const express = require('express');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const { signup, signin, updateUser }=require('../controller/auth');
const requireSignin = require('../middleware');
const router = express.Router();



router.post('/signup', validateSignupRequest, isRequestValidated, signup );
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
router.post('/update', requireSignin, updateUser);

module.exports = router;