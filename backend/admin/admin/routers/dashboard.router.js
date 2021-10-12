const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const auth = require("../../helpers/admin/auth");

router.get("/admin/dashboard", auth.afterLogin,dashboardController.dashboard);
module.exports= router;