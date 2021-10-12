
// const recordTenancyService = require("../services/record.tenancy.service")
// const { date } = require("joi")
const recordTenancyCollection = require("../../models/record.tenancy.model")
const getLastMonthTenant = async (req, res) => {
    const dat  = new Date()
    const b =dat.getYear()
    console.log(b);
    var d = new Date();
    var n = d.getMonth();
    try {
        let result = await recordTenancyCollection.aggregate(   
            [
                {$addFields: {  "month" : {$month: '$createOn'}}},
                {$match: { month: b}}
              ]
        )
        let count = await recordTenancyCollection.countDocuments()
        
        console.log(count);
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


module.exports = {
    getLastMonthTenant
}


