const Joi = require("joi");
const { sendTenancyAndCreditProofMailFun } = require("../../helpers/helpers");
const recordTenancyService = require("../services/record.tenancy.service")
const { v4: uuidv4 } = require('uuid');
const signupService = require("../services/auth.service")
const recordTenancyCollection = require("../../models/record.tenancy.model")
const rentHistoryTenancyCollection = require("../../models/rentHistory..model")

var ObjectId = require('mongodb').ObjectID;

const addRecordTenancy = async (req, res) => {
    const data = req.body
    try {
        const payload = {
            ...data,
            userId: req.tokenData.userId,
            createOn: new Date(),
            isDeleted: false
        }
        const condition = {
            selectProperties: req.body.selectProperties,
            Units: req.body.Units,
            userId: req.tokenData.userId
        }
        console.log(condition," condition   condition   condition");
        let existingUser = await recordTenancyService.findOne(condition)
        if (!existingUser) {
            console.log("hello");
            const result = await recordTenancyCollection.create(payload)
            return res.status(200).json({
                message: "Tenant Record Created Successfully ",
                status: 200
            })
        } else {
      
            console.log("hello",req.body.allTenantData);
            const result = await recordTenancyCollection.update({ _id: ObjectId(existingUser._id) },
                {
                    $push: {
                        "allTenantData":
                            req.body.allTenantData
                    },
                })
            return res.status(200).json({
                message: " Tenant Record Created Successfully",
                status: 200
            })
        }
        // }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,
        })
    }
}
const getAllRecordTenancy = async (req, res) => {
    let skip = req.params.pageNumber

    if (skip == 'undefined') {
        console.log("kkkkkkkkkkkk");
        skip = 0
    }
    try {
        let conditions = {
            userId: req.tokenData.userId,
            isDeleted: false
        }
        // if (req.query.search) {
        //     conditions = {
        //         ...conditions,
        //         $or: [
        //             { FirstName: { $regex: req.query.search } },
        //             { LastName: { $regex: req.query.search } },
        //             { Email: { $regex: req.query.search } },
        //             { phoneNumber: { $regex: req.query.search } },
        //             { MiddleName: { $regex: req.query.search } },
        //             { Alias: { $regex: req.query.search } },
        //             { Suffix: { $regex: req.query.search } },
        //             { MovedIn: { $regex: req.query.search } },
        //             { DateOfBirth: { $regex: req.query.search } },
        //             { selectProperties: { $regex: req.query.search } },
        //             { Units: { $regex: req.query.search } },
        //             { Price: { $regex: req.query.search } },
        //             { Month: { $regex: req.query.search } },
        //             { Balance: { $regex: req.query.search } },
        //             { Status: { $regex: req.query.search } },
        //         ]
        //     }
        // }
        // let resultAll = await recordTenancyCollection.aggregate([
        //     { $match: { userId: ObjectId(req.tokenData.userId) } },
        //     {
        //         $project: {
        //             selectProperties: 1
        //         }
        //     },
        // ])
        // console.log(conditions);
        let result = await recordTenancyService.get(conditions)
        const count = await recordTenancyService.count(conditions);
        if (result.length === 0) {
            return res.status(200).json({
                message: "data not found",
                status: 404
            })
        } else {
            return res.status(200).json({
                message: "all record tenancy",
                Total: count,
                status: 200,
                data: result

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
const getRentReport = async (req, res) => {
    // console.log(req.body, "kkkkkkkkkkkkk");
    let year = req.body.setyear
    let Month = req.body.Month
    try {
        if (!year) {
            year = new Date().getFullYear()
            let conditions = {
                userId: req.tokenData.userId,
                isDeleted: false,
                Month: req.body.Month,    
                year: year,
                selectProperties: req.body.selectProperties
            }
            let result = await rentHistoryTenancyCollection.find(conditions)
            const count = await rentHistoryTenancyCollection.count(conditions);
            if (result.length === 0) {
                return res.status(200).json({
                    message: "data not found",
                    status: 404
                })
            } else {
                return res.status(200).json({
                    message: "all record tenancy",
                    Total: count,
                    status: 200,
                    data: result
                })
            }
        }
        else if (year && !Month){
            let conditions2 = {
                userId: req.tokenData.userId,
                isDeleted: false,
                year: year,
                selectProperties: req.body.selectProperties
            }
            let result = await rentHistoryTenancyCollection.find(conditions2)
            const count = await rentHistoryTenancyCollection.count(conditions2);
            if (result.length === 0) {
                return res.status(200).json({
                    message: "data not foundtttttt",
                    status: 404
                })
            } else {
                return res.status(200).json({
                    message: "all record tenancy",
                    Total: count,
                    status: 200,
                    data: result
                })
            }
        }else{
            let conditions3 = {
                userId: req.tokenData.userId,
                isDeleted: false,
                Month: req.body.Month,
                year: year,
                selectProperties: req.body.selectProperties
            }
            let result = await rentHistoryTenancyCollection.find(conditions3)
            const count = await rentHistoryTenancyCollection.count(conditions3);
            if (result.length === 0) {
                return res.status(200).json({
                    message: "data not fountttt5555555555tttttt",
                    status: 404
                })
            } else {
                return res.status(200).json({
                    message: "all record tenancy",
                    Total: count,
                    status: 200,
                    data: result
    
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
const updateRecordTenancy = async (req, res) => {
    console.log(req.body, "jjjjjjjjjjjjjjjjjjjjjjj");
    const conditions = {
        _id: req.params.id,

    };
    console.log(conditions, "kkkkkkkkkkk");
    try {
        let result1 = await recordTenancyService.findOne(conditions);
        // console.log(result1);

        if (!result1) {
            return res.status(200).send({
                message: "properties is not exists",
                code: 422,
            });
        } else {
            // console.log(result1, "  ");
            const data = req.body
            const payload = {
                ...data
            }
            if (req.body.updateId) {


                let result = await recordTenancyService.update({ _id: req.params.id, 'allTenantData.id': req.body.updateId }, {
                    '$set': {
                        'allTenantData.$.FirstName': req.body.FirstName,
                        'allTenantData.$.LastName': req.body.LastName,
                        'allTenantData.$.Email': req.body.Email,
                        'allTenantData.$.phoneNumber': req.body.phoneNumber,
                        'allTenantData.$.DateOfBirth': req.body.DateOfBirth,
                        'allTenantData.$.OptionalSIN': req.body.OptionalSIN,
                        'allTenantData.$.CoSigner': req.body.CoSigner,
                        'allTenantData.$.MovedIn': req.body.MovedIn,
                        'allTenantData.$.CoSigner': req.body.CoSigner,
                        'selectProperties': req.body.selectProperties,
                        'Units': req.body.Units,
                        'Price': req.body.Price,

                    }
                });
                return res.status(200).json({
                    message: 'tenancy record  update  successfully',
                    status: 200,
                    result: result
                })
            } else {
                let result = await recordTenancyService.update(conditions, payload)
                return res.status(200).json({
                    message: 'tenancy record  update  successfully',
                    status: 200,
                    result: result
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
const deleterecordTenancy = async (req, res) => {
    const conditions = {
        _id: req.params.id,
    };
    try {
        let result1 = await recordTenancyService.findOne(conditions);
        if (!result1) {
            return res.status(200).send({
                message: "properties is not exists",
                code: 422,
            });
        } else {
            let result = await recordTenancyService.deleteTenancy(conditions);
            return res.status(200).json({
                message: 'properties delete successfully',
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
const sendTenancyAndCreditProofMail = async (req, res) => {
    const conditions = {
        _id: req.tokenData.userId,
    };
    let data = req.body.allTenantData
    // console.log(data,conditions, "vvvvvvvvvvvvvvvvvvvvvvvvvvvv");
    try {
        let result = await signupService.findOne(conditions);
        if (!result) {
            return res.status(200).send({
                message: "email is does not exist please enter correct Email",
                code: 404,
            });
        } else {
            for (let item of data) {
                console.log(item, "itemffffffffffff");
                const token = uuidv4();
                const payload = {
                    expireToken: token,
                    landlordId: req.tokenData.userId,
                }
                const payload1 = {
                    Email: item.Email,
                }
                console.log(payload1);
                const saveEmailToken = await recordTenancyService.postEmailToken(payload)
                const tenancyData = await recordTenancyService.findOne(payload1)
                console.log(tenancyData, "tenancyData   tenancyData");
                const email = await sendTenancyAndCreditProofMailFun({
                    landlorad: result.email, tenacnyemail: item.Email,
                    Name: item.FirstName, token: token, landlordId: req.tokenData.userId, selectProperties: req.body.selectProperties
                })
            }
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
const checkEmailToken = async (req, res) => {
    console.log(req.body, "hhhhhhhhhhhhhhhhhh");
    const schema = Joi.object({
        expireToken: Joi.string().required(),
    });
    let schemaValidator = schema.validate(req.body);
    if (schemaValidator.error) {
        return res.status(400).json({
            message: schemaValidator.error.message || "Bad Request!",
            code: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;
    }
    const conditions = {
        expireToken: schemaValidator.expireToken,
    };
    try {
        console.log(conditions, "jjjjjjjj");
        let result = await recordTenancyService.findOneToken(conditions);
        if (!result) {
            return res.status(200).send({
                message: "email is does not exist please enter correct Email",
                status: 404,
            });
        } else {
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
const deleteEmailToken = async (req, res) => {
    // console.log(req.params, "kkkkkkkkkkkkkkkkkkkkk");
    const schema = Joi.object({
        expireToken: Joi.string().required(),
    });
    let schemaValidator = schema.validate(req.params);
    if (schemaValidator.error) {
        return res.status(400).json({
            message: schemaValidator.error.message || "Bad Request!",
            code: 400,
        });
    } else {
        schemaValidator = schemaValidator.value;
    }
    const conditions = {
        expireToken: schemaValidator.expireToken,
    }
    try {
        let result1 = await recordTenancyService.findOneToken(conditions);
        console.log(result1, "jjjjjjjjjj");
        if (!result1) {
            return res.status(200).send({
                message: "token is not exists",
                code: 422,
            });
        } else {
            let result = await recordTenancyService.DeleteToken(conditions);
            return res.status(200).json({
                message: 'token delete  successfully',
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
const getTenancyByTenanctId = async (req, res) => {
    console.log(req.tokenData, "kkkkkkkkkkkkkkkkkk");
    try {
        const condition = {
            _id: req.tokenData.tenancyId
        }
        console.log(condition);
        let result = await recordTenancyService.findOne(condition)
        console.log(result, "jjjjjjjjjjj");
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
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}


const addRentReportHistory = async (req, res) => {
    try {
        let result = await recordTenancyService.get()
        for(let item of result){
            let payload ={
                allTenantData:item.allTenantData,
                selectProperties:item.selectProperties,
                Units:item.Units,
                Price:item.Price,
                userId:item.userId,
                createOn:item.createOn,
                isDeleted:item.isDeleted,
                Balance:item.Balance,
                Month:item.Month,
                Status:item.Status,
                year:item.year
            }
            const upadatePayload = {
                Balance:"",
                Month:"",
                Status:"",
                year:""
            }
            const condition = {
                _id:item._id
            }
            console.log(upadatePayload,"kkkkkkkkk");
            console.log(condition);
            let addRentReport= await rentHistoryTenancyCollection.create(payload)
            let updateRentReport = await recordTenancyCollection.findByIdAndUpdate(condition,upadatePayload)
           
        }
        return res.status(200).json({
            message: ' success full',
            status: 200,
            data: result
        })
    
    } catch (error) {
        console.log(error);
}
}

module.exports = {
    addRecordTenancy,
    getAllRecordTenancy,
    deleterecordTenancy,
    updateRecordTenancy,
    sendTenancyAndCreditProofMail,
    checkEmailToken,
    deleteEmailToken,
    getTenancyByTenanctId,
    getRentReport,
    addRentReportHistory

}