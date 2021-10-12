const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/Tenant.controller')
// const auth = require("../../helpers/admin/auth");
const { checkAuth, checkRole } = require('../../middlewares/check-auth');

router.get("/admin/get-tenent-rent-report-loadlord-by-id/:landlordId",checkAuth,checkRole("1"), tenantController.getTanantRentReportByLondlordId);
// router.patch("/admin/change-password",checkAuth,checkRole("1"), userController.changePassword);
// router.delete("/admin/delete-user/:id",checkAuth,checkRole("1"), userController.deteleUser);
// router.patch("/admin/update-user/:id",checkAuth,checkRole("1"), userController.updateUser);
// router.get("/admin/get-user-by-id/:id",checkAuth,checkRole("1"), userController.getUserById);
// router.patch("/admin/change-status/:id/:status",checkAuth,checkRole("1"), userController.changeUserStatus);
// router.get("/admin/total-tenant",checkAuth,checkRole("1"), userController.allTenantCount);
// router.get("/admin/total-landlord",checkAuth,checkRole("1"), userController.allLandlordCount);


module.exports= router; 