const Joi = require("joi")
const bcrypt = require("bcrypt")
const signupService = require("../services/auth.service")
const common = require("../../middlewares/common");
const { sendForgotPasswordMail } = require("../../helpers/helpers");
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');
const createLandlord = async (req, res) => {
    const userSchema = Joi.object({
        fullName: Joi.string().min(3).max(20).required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().length(10).required(),
        documentType: Joi.string().required(),
        address2: Joi.string().optional().allow("", null),
        latlng: Joi.string().allow("", null),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
        profile_img: Joi.string().allow("", null),
        role: Joi.string().default(2).allow("", null, 1, 2, 3).optional(),
        termsAndCondition: Joi.string().required()
    })
    let schemaValidator = userSchema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(200).json({
            error: "Invalid payload",
            message: schemaValidator.error.message,
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
            return res.status(200).json({
                message: "user is already exists",
                status: 409
            })
        } else {
            try {
                let document = []
                if (req.files.length > 0) {
                    console.log(req.files.length);
                    let count = 0
                    req.files.map(async (file) => {
                        count += 1
                        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" ||
                            file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
                            document.push(file.filename)
                            if (req.files.length == count) {
                                console.log(userPayload, "hhhhhh");
                                const encryptedPass = await bcrypt.hash(userPayload.password, saltRounds);
                                userPayload['password'] = encryptedPass;

                                const payload = {
                                    ...userPayload,
                                    document,
                                    creationTs: Date.now()
                                }
                                console.log(payload);
                                const result = await signupService.post(payload)
                                return res.status(200).json({
                                    message: "user create successfully",
                                    data: result,
                                    status: 200
                                })
                            } else {
                                console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
                            }

                        } else {
                            return res.status(200).json({
                                message: "Only .png, .jpg and .jpeg and pdf format allowed!",
                            })
                        }

                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,",
            status: 500,

        })
    }

}
const createTenancy = async (req, res) => {
    console.log(req.body);
    const userSchema = Joi.object({
        FirstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        address: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.string().length(10).required(),
        address2: Joi.string().optional().allow("", null),
        latlng: Joi.string().allow("", null),
        city: Joi.string().required(),
        province: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
        profile_img: Joi.string().allow("", null),
        role: Joi.string().default(3).allow("", null, 1, 2, 3).optional(),
        tenancyId: Joi.string().required(),
        landlordId: Joi.string().required()

    })
    let schemaValidator = userSchema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(200).json({
            error: "Invalid payload",
            message: schemaValidator.error.message,
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
            return res.status(200).json({
                message: "Email already taken",
                status: 409
            })
        } else {
            const encryptedPass = await bcrypt.hash(userPayload.password, saltRounds);
            userPayload['password'] = encryptedPass;
            const payload = {
                ...userPayload,
                createOn: new Date()
            }
            console.log(payload);
            const result = await signupService.post(payload)
            return res.status(200).json({
                message: "Details Added Successfully",
                data: result,
                status: 200
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }

}

const signin = async (req, res) => {
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
        // console.log(result.status,"jjjjjjjjjjjjj");

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
        if (result.tenancyId) {
            const tenancyTokenPayload = {
                userId: result._id,
                email: result.email,
                password: result.password,
                role: result.role,
                fullName: result.fullName,
                tenancyId: result.tenancyId
            };
            if (result.status == "Deactive") {
                return res.status(200).send({
                    message: "Sorry you account block by Admin",
                    status: 404,
                });

            }
            const token = await common.generateToken(tenancyTokenPayload);
            return res.status(200).json({
                message: "success",
                data: result,
                token: token,
                status: 200,
            });
        } else {
            const tokenPayload = {
                userId: result._id,
                email: result.email,
                password: result.password,
                role: result.role,
                fullName: result.fullName,
            };
            console.log(tokenPayload, "nnnnnnnnnnnnnnn");
            const token = await common.generateToken(tokenPayload)
            return res.status(200).json({
                message: "success",
                data: result,
                token: token,
                status: 200,
            });
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            message: "Internal Server Error",
            status: 500,
        });
    }
};
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
        let result = await signupService.findOne(conditions);
        console.log("req.body.email", result);
        if (!result) {

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
            await sendForgotPasswordMail({ email: req.body.email, token: token })

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
module.exports = {
    signin,
    createLandlord,
    fongotPassword,
    newPassword,
    createTenancy
}