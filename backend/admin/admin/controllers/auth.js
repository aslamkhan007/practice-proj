const signupService = require("../services/auth.services")
const Joi = require("joi")
const bcrypt = require("bcrypt");
const common = require("../../middlewares/common")
const saltRounds = 10;

const { v4: uuidv4 } = require('uuid');
const { now } = require("mongoose");
const auth = require("../../helpers/admin/auth");
const { sendForgotPasswordMail } = require('../../helpers/helpers');
/**
 * @author prabhakar sarkar
 * @description:
 */
const createUser = async (req, res) => {
    console.log(req.body);
    const userSchema = Joi.object({
        fullName: Joi.string().min(3).max(20).required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().length(10).required(),
        role: Joi.string().required(),
    })
    let schemaValidator = userSchema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({
            message: "Invalid payload",
            error: schemaValidator.error.message,
            status: 400
        })
    } else {
        userPayload = schemaValidator.value
    }
    try {

        const condition = {
            email: userPayload.email
        }
        const existingUser = await signupService.findOne(condition)
        console.log(existingUser);
        if (existingUser && existingUser.length !== 0) {
            return res.status(409).json({
                message: "user is already exists",
                status: 409
            })
        } else {
            const encryptedPass = await bcrypt.hash(userPayload.password, saltRounds);
            userPayload['password'] = encryptedPass;
            const payload = {
                ...userPayload,
                creationTs: Date.now()
            }
            console.log(payload);
            const result = await signupService.post(payload)
            return res.status(200).json({
                message: "user create seccuss fully",
                data: result,
                status: 200
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }

}


/**
 * @author prabhakar sarkar
 * @description this is login function
 * @date  6-8-2021
 */

const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(200).json({
            message: schemaValidator.error.message || "Bad Request!",
            status: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;
    }
    const conditions = {
        email: schemaValidator.email,
    };
    try {
        let result = await signupService.findOne(conditions);
        if (!result) {
            return res.status(200).send({
                message: "Incorrect email address",
                status: 404,
            });
        }
        const plainPass = await bcrypt.compare(
            schemaValidator.password,
            result.password
        );
        if (!plainPass) {
            return res.status(200).send({
                message: "Incorrect password!",
                status: 404,
            });

        }
        const tokenPayload = {
            userId: result._id,
            email: result.email,
            password: result.password,
            role: result.role,
            fullName: result.fullName
        };
        console.log(result, "jjjjjjjjjj");
        if (result.role !== "1") {
            return res.status(200).send({
                message: "Access denied!",
                status: 403
            });
        }
        const token = await common.generateToken(tokenPayload);
        return res.status(200).json({
            message: "success",
            data: result,
            token: token,
            status: 200,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
}

const fongotPassword = async (req, res) => {
    console.log(req.body);
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });
    let formdata = {};
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({
            message: schemaValidator.error.message || "Bad Request!",
            code: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;
        formdata = schemaValidator.value;
    }
    const conditions = {
        email: schemaValidator.email,
    };
    try {
        console.log('174', req.body.email);
        let result1 = await signupService.findOne(conditions);
        console.log("req.body.email", result1);
        if (!result1) {

            return res.status(200).send({
                message: "email is does not exist please enter correct Email",
                code: 404,
            });
        } else {
            console.log('184', req.body);
            const token = uuidv4();
            const expireToken = Date.now() + 36000000
            const payload = {
                resetToken: token,
                expireTokne: expireToken
            }
            console.log('payload', payload);
            const result = await signupService.update(conditions, payload)
            await sendForgotPasswordMail({ email: req.body.email, userId: result1._id, token: token })

            return res.status(200).json({
                message: "Email sent successfully",
                data: result,
                status: 200
            })

        }

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}


const newPassword = async (req, res) => {
    console.log(req.body, "lllllllllllllllllllllll");
    const schema = Joi.object({
        password: Joi.string().required(),
        confirmPassword: Joi.string().required(),
        resetToken: Joi.string().required()
    });
    var formdata = {};
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(200).json({
            message: schemaValidator.error.message || "Bad Request!",
            code: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;
        formdata = schemaValidator.value;
    }
    const conditions = {
        resetToken: schemaValidator.resetToken,
    };
    try {
        let result = await signupService.findOne(conditions);
        if (!result) {
            return res.status(200).send({
                message: "try again session expired",
                code: 422,
            });
        } else {
            if (schemaValidator.password == schemaValidator.confirmPassword) {
                const encryptedPass = await bcrypt.hash(schemaValidator.password, saltRounds);
                const payload = {
                    password: encryptedPass,
                    resetToken: undefined,
                    expireTokne: undefined
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
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}

const userUpadte = async (req, res) => {
    console.log(req.body,"update user ");
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(20),
        address: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string().length(10),
        role: Joi.string()
    });
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        console.log(schemaValidator.error,"JJJJJJJJJJJJJJJJJJJJJJJJJJ");
        return res.status(200).json({
            message: schemaValidator.error.message || "Bad Request!",
            status: 400,
        });
    } else {
        userPayload = schemaValidator.value;
      
    }
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
            const payload = {
                ...userPayload
            }
            console.log(req.params.id);
            let result = await signupService.update(conditions, payload);
            console.log(req.body);
            return res.status(200).json({
                message: 'user updated  successfully',
                status: 200,
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
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


module.exports = {
    createUser,
    login,
    newPassword,
    fongotPassword,
    userUpadte,
    getUserById,
}


