const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");
const Orgcontrollers = require("../controllers/orgControllers");


// organisation register routes
router.post("/org/orgregister",Orgcontrollers.Orgregister);
router.post("/org/registersendotp",Orgcontrollers.RegisterOtpsend );

// organisation login routes
router.post("/org/orglogin",Orgcontrollers.OrgLogin);
router.post("/org/loginsendotp",Orgcontrollers.LoginOtpSend);

/// user (donor) register routes
router.post("/user/register",controllers.userregister);
router.post("/user/registersendotp",controllers.RegisterOtpsend);

// user(donor) login routes
router.post("/user/sendotp",controllers.userOtpSend);
router.post("/user/login",controllers.userLogin);



module.exports = router;