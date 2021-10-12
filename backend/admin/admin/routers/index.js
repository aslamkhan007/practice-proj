const express = require("express");
const router = express.Router();
const authRouter = require("./auth.router")
const dashboardRouter = require("./dashboard.router")
const userRouter = require("./user.router")
const homePageRouter = require("./Home.router")
const tenantRouter= require("./Tenant.router")
router.use('/',authRouter)
router.use('/',dashboardRouter)
router.use('/',userRouter)
router.use('/',homePageRouter)
router.use("/",tenantRouter)

module.exports=router