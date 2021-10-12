const express = require('express');
const router = express.Router();
const homeController = require('../controllers/Home.controller')
const { checkAuth, checkRole } = require('../../middlewares/check-auth');
const shortid = require("shortid")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    cb(null, shortid.generate() + '-' +file.originalname) 
  }
});
const upload = multer({storage})
router.patch("/admin/update-home",checkAuth,checkRole("1"),upload.single("creditProofServicesImage"),homeController.updateCreditProofServices);
router.patch("/admin/happy-client-home",checkAuth,checkRole("1"),upload.single("clientImage"),homeController.updateOurHappyClient);

router.patch("/admin/update-home-how-credit-proof-work",checkAuth,checkRole("1"),
upload.fields([{name:"registerYourselfImage"},{name:"verifyCreditscoreImage"},{name:"reviewYourlandlordImage"}]),homeController.updateHowCreditproofworks);

router.get("/admin/get-home", homeController.getHomePageData);
router.patch("/admin/update-contect-us", homeController.updateContactUs);

module.exports= router; 