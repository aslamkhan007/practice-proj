const express = require("express");
const router = express.Router();
const authRouter = require("./auth.router")
const userRouter = require("./user.router")
const recordTenancyRouter = require("./record.tenancy.router")
const propertiesRouter = require("./properties.router")
const emailRouter = require("./email.cron.router")

router.use('/',authRouter)
router.use("/",userRouter)
router.use("/",recordTenancyRouter)
router.use("/",propertiesRouter)
router.use("/",emailRouter)
module.exports=router