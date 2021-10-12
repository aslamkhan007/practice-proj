const Joi = require("joi")
const PropertiesService = require("../services/properties.service")

const addProperties = async (req, res) => {
    console.log(req.body);
    const userSchema = Joi.object({
        Address: Joi.string().required(),
        City: Joi.string().required(),
        Country: Joi.string().required(),
        Province: Joi.string().required(),
        PostalCode: Joi.string().required(),
        PropertieNickName: Joi.string().allow("",null),
        Units: Joi.array().items({
            Suite: Joi.string().required(),
            type: Joi.string().required(),
            Bedrooms: Joi.string().required(),
            id: Joi.string().allow("", null),

        })
    })
    let schemaValidator = userSchema.validate(req.body);
    if (schemaValidator.error) {
        console.log(schemaValidator.error,"jkkkkkkkkjjjjjjjjjjjjjjj");
        return res.status(200).json({
            error: "Invalid payload",
            message: schemaValidator.error.message,
            status: 400
        })
    } else {
        PropertiesPayload = schemaValidator.value
    }
    try {
        if (PropertiesPayload.Units.length === 0) {
            return res.status(200).json({
                message: "please selete at least one Units",
                status: 400
            })
        } else {
            const payload = {
                ...PropertiesPayload,
                userId:req.tokenData.userId,

                createOn: new Date()
            }
            console.log(payload,"jjjjjjjjjjjjjjjjjjjjjj");
            const result = await PropertiesService.post(payload)
            return res.status(200).json({
                message: "Properties add seccussfully",
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
const getAllProperties = async (req, res) => {
    console.log(req.tokenData);
    let conditions = {}
    let skip = req.params.pageNumber
    console.log(req.query, "bbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(skip, "nnnnnnnnnnnnnnnnnnnn");
    if (skip == 'undefined') {
        skip = 0
    }
    conditions = {
        userId: req.tokenData.userId,
        isDeleted:false
    }
    if (req.query.search) {
        conditions = {
            ...conditions,
            $or: [
                { Address: { $regex: req.query.search } },
                { City: { $regex: req.query.search } },
                { Country: { $regex: req.query.search } },
                { Province: { $regex: req.query.search } },
                { PostalCode: { $regex: req.query.search } },
                { PropertieNickName: { $regex: req.query.search } },
            ]
        }
    }
    try {

        let result = await PropertiesService.get(conditions, Number(skip))
        const count = await PropertiesService.count(conditions);
        if (result.length === 0) {
            return res.status(200).json({
                message: "data not found",
                status: 404
            })
        } else {
            return res.status(200).json({
                message: "all Properties record",
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
const updateProperties = async (req, res) => {
    const conditions = {
        _id: req.params.id,
    };

    try {
        let result1 = await PropertiesService.findOne(conditions);
        if (!result1) {
            return res.status(200).send({
                message: "properties is not exists",
                code: 422,
            });
        } else {
            console.log(result1, "  ");
            const data = req.body
            const payload = {
                ...data
            }
            let result = await PropertiesService.update(conditions, payload);
            return res.status(200).json({
                message: 'properties update  successfully',
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

const deleteProperties = async (req, res) => {
    const conditions = {
        _id: req.params.id,
      
    
    };

    try {
        let result1 = await PropertiesService.findOne(conditions);
        if (!result1) {
            return res.status(200).send({
                message: "properties is not exists",
                code: 422,
            });
        } else {
            const data = req.body
            console.log(data,"hhhhhhhhhh");
            const payload = {
                ...data
            }
            let result = await PropertiesService.update(conditions, payload);
            return res.status(200).json({
                message: 'properties delete  successfully',
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



module.exports = {
    addProperties,
    getAllProperties,
    updateProperties,
    deleteProperties
}