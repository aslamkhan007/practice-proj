const express = require('express');
const { checkAuth } = require('../../middlewares/check-auth');
const router = express.Router();
const propertiesController = require('../controllers/properties.controller');




router.post("/api/add-properties",checkAuth,propertiesController.addProperties);
router.get("/api/add-properties/:pageNumber",checkAuth,propertiesController.getAllProperties);
router.patch("/api/update-properties/:id",checkAuth,propertiesController.updateProperties);
router.patch("/api/delete-properties/:id",checkAuth,propertiesController.deleteProperties);
module.exports= router;
