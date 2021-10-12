const Joi = require("joi")
const signupService = require("../services/auth.service")
const bcrypt = require("bcrypt");
const { PreconditionFailed } = require("http-errors");
const saltRounds = 10;
const getAllUser = async (req, res) => {
    let result = await signupService.get()
    console.log(result);
    res.send(result)
}

const getUserById = async (req, res) => {
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
                message: ' success full',
                status: 200,
                data: result
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}
const updateUser = async (req, res) => {
    console.log(req.params.id);
    const conditions = {
        _id: req.params.id,
    };
    const conditions2 = {
        email: req.body.email,
    }
    try {
        let result1 = await signupService.findOne(conditions);
        if (result1 && result1.email === req.body.email) {
            if (req.file) {
                let data = req.body
                let payload = {
                    profile_img: req.file.filename,
                    ...data
                }
                let result = await signupService.update(conditions, payload);
                return res.status(200).json({
                    message: 'user update  success full',
                    status: 200,
                    data: result
                })
            } else {
                console.log(result1, " hhhhhhhhhhhhhhhhhhhhhh ");
                const data = req.body
                const payload = {
                    profile_img: result1.profile_img,
                    ...data
                }
                let result = await signupService.update(conditions, payload);
                return res.status(200).json({
                    message: 'user update  success full',
                    status: 200,
                    data: result
                })
            }
        } else {
            let result = await signupService.findOne(conditions2);
            console.log(result, "ggggggggggggggggggggggggg");
            if(result) {
                return res.status(200).json({
                    message: 'this email is all ready  exists please enter another email',
                    status: 422,
                })
            } else {
                console.log("prabhakar");
                if (req.file) {
                    const data = req.body
                    const payload = {
                        profile_img: req.file.filename,
                        ...data
                    }
                    let result = await signupService.update(conditions, payload);
                    return res.status(200).json({
                        message: 'user update  success full',
                        status: 200,
                        data: result
                    })
                } else {
                    console.log(result1, "  ");
                    const data = req.body
                    const payload = {
                        profile_img: result1.profile_img,
                        ...data
                    }
                    let result = await signupService.update(conditions, payload);
                    return res.status(200).json({
                        message: 'user update  success full',
                        status: 200,
                        data: result
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



// const updateUser = async (req, res) => {
//     console.log(req.file,req.body);
//     const conditions = {
//         _id: req.params.id,
//     };

//     try {
//         let result1 = await signupService.findOne(conditions);
//         if (!result1) {
//             return res.status(200).send({
//                 message: "user is not exists",
//                 code: 422,
//             });
//         } else {
//             if(req.file){
//                 const data = req.body
//                 const payload = {
//                     profile_img:req.file.filename,
//                     ...data
//                 }
//                 let result = await signupService.update(conditions,payload);
//             return res.status(200).json({
//                 message: 'user update  success full',
//                 status: 200,
//                 data:result
//             })
//             }else{
//                 console.log(result1,"  ");
//                 const data = req.body
//                 const payload = {
//                     profile_img:result1.profile_img,
//                     ...data
//                 }
//                 let result = await signupService.update(conditions,payload);
//                 return res.status(200).json({
//                     message: 'user update  success full',
//                     status: 200,
//                     data:result
//                 })
//             }

//         }       
//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error", error,
//             status: 500,
//         });
//     }
// }

const newPassword = async (req, res) => {
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
        _id: req.params.id,
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
                    status: 200,
                })
            } else {
                if (schemaValidator.newPassword == schemaValidator.confirmPassword) {
                    const encryptedPass = await bcrypt.hash(schemaValidator.newPassword, saltRounds);

                    const payload = {
                        password: encryptedPass,
                    }
                    let result = await signupService.update(conditions, payload);
                    return res.status(200).json({
                        message: 'password change success full',
                        status: 200,
                    })
                } else {
                    return res.status(200).json({
                        message: 'confirmPassword is worng',
                        status: 200,
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
module.exports = {
    updateUser,
    getAllUser,
    getUserById,
    newPassword,
}

