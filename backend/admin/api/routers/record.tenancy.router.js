const express = require('express');
const { checkAuth } = require('../../middlewares/check-auth');
const router = express.Router();
const recordTenancyController = require('../controllers/record.tenancy.controllers');




router.post("/api/add-record-tenancy",checkAuth,recordTenancyController.addRecordTenancy);
router.get("/api/get-record-tenancy/:pageNumber",checkAuth,recordTenancyController.getAllRecordTenancy);
router.patch("/api/update-record-tenancy/:id",checkAuth,recordTenancyController.updateRecordTenancy);
router.patch("/api/delete-record-tenancy/:id",checkAuth,recordTenancyController.deleterecordTenancy);
router.post("/api/verify-doucment",checkAuth,recordTenancyController.sendTenancyAndCreditProofMail);
router.post("/api/verify-token",recordTenancyController.checkEmailToken);
router.delete("/api/delete-token/:expireToken",recordTenancyController.deleteEmailToken);
router.get("/api/get-tenancy-by-tenanctId",checkAuth,recordTenancyController.getTenancyByTenanctId);
router.post("/api/get-rent-report",checkAuth,recordTenancyController.getRentReport);
router.get("/api/add-rent-report-history",recordTenancyController.addRentReportHistory);
module.exports= router;

