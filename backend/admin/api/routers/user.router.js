const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const shortid = require("shortid")
const multer = require("multer");
const { checkAuth } = require('../../middlewares/check-auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' +file.originalname)
  }
});
const upload = multer({storage})

router.get("/api/get/user/id/:id",checkAuth,userController.getUserById);
router.get("/api/getAll/user",checkAuth,userController.getAllUser);
router.patch("/api/update/user/:id",checkAuth,upload.single("profile_img"),userController.updateUser);
router.patch("/api/update/password/:id",checkAuth,userController.newPassword);
module.exports= router; 