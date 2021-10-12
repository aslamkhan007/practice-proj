
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers')
const auth = require("../../helpers/admin/auth");
const { checkAuth, checkRole } = require('../../middlewares/check-auth');

router.get("/admin/all-users/:pageNumber/:pageLimit/:userRole",checkAuth,checkRole("1"), userController.getAllUserAdmin);
router.patch("/admin/change-password",checkAuth,checkRole("1"), userController.changePassword);
router.delete("/admin/delete-user/:id",checkAuth,checkRole("1"), userController.deteleUser);
router.patch("/admin/update-user/:id",checkAuth,checkRole("1"), userController.updateUser);
router.get("/admin/get-user-by-id/:id",checkAuth,checkRole("1"), userController.getUserById);
router.patch("/admin/change-status/:id/:status",checkAuth,checkRole("1"), userController.changeUserStatus);
router.get("/admin/total-tenant",checkAuth,checkRole("1"), userController.allTenantCount);
router.get("/admin/total-landlord",checkAuth,checkRole("1"), userController.allLandlordCount);


module.exports= router; 