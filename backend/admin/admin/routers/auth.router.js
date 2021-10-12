const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const auth = require("../../helpers/admin/auth");
const {checkAuth} = require("../../middlewares/check-auth")

router.post("/admin/login",authController.login);
router.post("/api/forgotpassword",authController.fongotPassword);
router.post("/admin/api/update-password", authController.newPassword);
router.post("/admin/api/update/:id",checkAuth, authController.userUpadte);
router.get("/admin/get/user/:id",checkAuth,authController.getUserById);

// router.get("/admin/login1", auth.beforeLogin, authController.loginPage);
// router.post("/admin/api/signup", auth.beforeLogin, authController.createUser)
// router.get("/admin/logout", auth.afterLogin, authController.logout);
// router.post("/admin/api/fongotPassword", authController.fongotPassword);

// router.get("/admin/forgotpassword", authController.forgotPasswordPage);
// router.post("/admin/api/update/:id", authController.userUpadte);
// router.get("/admin/resetpassword/:token", authController.changePassword);
// router.get("/admin/profile", auth.afterLogin, authController.userProfile);
// // router.post("/admin/api/changepassword/:id", authController.changeUserPassword);
// router.get("/admin/changepassword", auth.afterLogin, authController.updatePassword);
module.exports = router;
