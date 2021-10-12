const signupService = require("../services/auth.services")
const Joi = require("joi")
const bcrypt = require("bcrypt");
const common = require("../../middlewares/common")
const saltRounds =10;


const dashboard = async (req,res)=>{
  
    res.render('dashboard/dashboard');
}

module.exports = {
    dashboard
    
}