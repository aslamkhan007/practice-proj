const Joi = require("joi");
const signupService = require("../services/user.services")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const getAllUserAdmin = async (req, res) => {
    console.log(req.params);
    let skip = req.params.pageNumber
    const adminId = req.tokenData.userId
    let role = req.params.userRole
    let limit = req.params.pageLimit
    if (skip == 'undefined') {
        skip = 0
    }       
    if (limit == 'undefined') {
        limit = 10
    }
    if (role === "undefined") {
        role = "2"
    }
    try {
        if (role === "2") {
            let conditions = {
                role: role
            }
            if(req.query.search){
                conditions = {  
                    ...conditions,
                    $or: [
                        {fullName: {$regex: req.query.search}},
                        {address: {$regex: req.query.search}},
                        {email: {$regex: req.query.search}},
                        {phoneNumber: {$regex: req.query.search}},
                        {province: {$regex: req.query.search}},
                        {city: {$regex: req.query.search}},
                        {postalCode: {$regex: req.query.search}},
                        {country: {$regex: req.query.search}},
                        {DateOfBirth: {$regex: req.query.search}},
                        {documentType: {$regex: req.query.search}},
                        {status: {$regex: req.query.search}},
                    ]
                }
            }
            let result = await signupService.get(conditions, Number(skip),Number(limit))
            const count = await signupService.count(conditions);
            // console.log(result);
            if (!result && result.length !== 0) {
                return res.status(200).send({
                    message: "data not found",
                    code: 404,
                });
            } else {
                return res.status(200).json({
                    message: "all record tenancy",
                    // Total: count,
                    status: 200,
                    data: result,
                    count: count
                })
            }
        } else {
            let conditions = {
                landlordId: role
            }
            if(req.query.search){
                
                conditions = {  
                    ...conditions,
                    $or: [
                        {FirstName : {$regex: req.query.search}},
                        {lastName : {$regex: req.query.search}},
                        {address: {$regex: req.query.search}},
                        {email: {$regex: req.query.search}},
                        {phoneNumber: {$regex: req.query.search}},
                        {province: {$regex: req.query.search}},
                        {city: {$regex: req.query.search}},
                        {postalCode: {$regex: req.query.search}},
                        {country: {$regex: req.query.search}},
                        {DateOfBirth: {$regex: req.query.search}},
                        {documentType: {$regex: req.query.search}},
                        {status: {$regex: req.query.search}},
                    ]
                }
            }
            let result = await signupService.get(conditions, Number(skip),Number(limit))
            const count = await signupService.count(conditions);
            console.log(result);
            if (!result && result.length !== 0) {
                return res.status(200).send({
                    message: "data not found",
                    code: 404,
                });
            } else {
                console.log(adminId, "jjjjjjjjjjj");
                console.log(result);
                return res.status(200).json({
                    message: "all record tenancy",
                    // Total: count,
                    status: 200,
                    data: result,
                    count: count
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,
        })
    }
}


const changePassword = async (req, res) => {
    console.log(req.tokenData.userId, "hhhhhhhhhhhhhhhhhhhh");
    console.log(req.body, req.params.id);
    const schema = Joi.object({
        newPassword: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        oldPassword: Joi.string().required()
    });
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(200).json({
            message: schemaValidator.error.message || "Bad Request!",
            code: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;

    }
    const conditions = {
        _id: req.tokenData.userId,
    };
    try {
        let result = await signupService.findOne(conditions);
        if (!result) {
            return res.status(200).send({
                message: "try again session expired",
                code: 422,
            });
        } else {

            const oldPassword = await bcrypt.compare(schemaValidator.oldPassword, result.password)

            if (!oldPassword) {
                return res.status(200).json({
                    message: ' old  password is wrong',
                    status: 422,
                })
            } else {
                if (schemaValidator.newPassword == schemaValidator.confirmPassword) {
                    const encryptedPass = await bcrypt.hash(schemaValidator.newPassword, saltRounds);

                    const payload = {
                        password: encryptedPass,
                    }
                    let result = await signupService.update(conditions, payload);
                    return res.status(200).json({
                        message: '  Password changed successfully',
                        status: 200,
                    })
                } else {

                    return res.status(200).json({
                        message: 'confirmPassword is worng',
                        status: 422,
                    })
                }
            }


        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            message: "Internal Server Error", error,
            status: 500,
        });
    }
}

const deteleUser = async (req, res) => {
    const conditions = {
        _id: req.params.id,
    };
    try {
        let result1 = await signupService.findOne(conditions);
        if (!result1) {
            return res.status(200).send({
                message: "user is not exists",
                code: 422,
            });
        } else {
            let result = await signupService.deleteQuery(conditions);
            return res.status(200).json({
                message: 'user deleted  successfully',
                status: 200,

            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}



const changeUserStatus = async (req, res) => {
    try {
        const conditions = {
            _id: req.params.id
        }
        if (req.params.status == "Active") {

            const payload = {
                status: "Deactive"
            }
            let result = await signupService.update(conditions, payload);
            return res.status(200).json({
                message: 'status changed  successfully',
                status: 200,

            })
        } else {
            const payload = {
                status: "Active"
            }
            let result = await signupService.update(conditions, payload);
            return res.status(200).json({
                message: 'status changed  successfully',
                status: 200,

            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}



const updateUser = async (req, res) => {
    console.log(req.body, "update user ");
    // const schema = Joi.object({
    //     fullName: Joi.string().min(3).max(20),
    //     address: Joi.string(),
    //     email: Joi.string().email(),
    //     phoneNumber: Joi.string().length(10),
    //     role: Joi.string()
    // });
    // let schemaValidator = schema.validate(req.body);
    // if (schemaValidator.error) {
    //     console.log(schemaValidator.error,"JJJJJJJJJJJJJJJJJJJJJJJJJJ");
    //     return res.status(200).json({
    //         message: schemaValidator.error.message || "Bad Request!",
    //         status: 400,
    //     });
    // } else {
    //     userPayload = schemaValidator.value;
    // }
    const conditions = {
        _id: req.params.id,
    };
    try {
        let result = await signupService.findOne(conditions);
        if (!result) {

            return res.status(200).send({
                message: "user is not exists",
                status: 422,
            });
        } else {
            console.log(req.params.id);
            let result = await signupService.update(conditions, req.body);
            console.log(req.body);
            return res.status(200).json({
                message: 'user updated  successfully',
                status: 200,
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}



const getUserById = async (req, res) => {
    console.log(req.params.id
    );
    try {
        const condition = {
            _id: req.params.id
        }
        let result = await signupService.findOne(condition)
        if (!result) {
            return res.status(200).send({
                message: "user is not exists",
                code: 422,
            });
        } else {
            return res.status(200).json({
                message: ' successfully',
                status: 200,
                data: result
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}


const allTenantCount = async (req, res) => {
    // res.send("hello")
    try {
        const conditions = {
            role: "3"
        }

        const count = await signupService.count(conditions);
        console.log(count,"jjjjjjjjjjjjjj");
        return res.status(200).send({
            totalTenant: count,
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }

}


const allLandlordCount = async (req, res) => {
    try {
        const conditions = {
            role: "2"
        }
        const count = await signupService.count(conditions);
        console.log(count);
        return res.status(200).send({
            totalLandlord: count,
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }

}



module.exports = {
    getAllUserAdmin,
    changePassword,
    deteleUser,
    updateUser,
    getUserById,
    allTenantCount,
    allLandlordCount,
    // deteleUserView,
    // showDocument,
    changeUserStatus
}
