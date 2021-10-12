const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const path = require('path');
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
router.post("/api/signup", upload.array("document"),authController.createLandlord)
router.post("/api/signup-tenancy",authController.createTenancy);
router.post("/api/login",authController.signin);
router.post("/api/resetpassword",authController.fongotPassword);
router.post("/api/newpassword",authController.newPassword);
module.exports= router;
