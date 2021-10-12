const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/email.cron.controller');


router.get("/api/send-email-in-month",EmailController.getLastMonthTenant);

module.exports= router; 
