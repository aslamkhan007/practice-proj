const recordTenancyCollection = require("../../models/record.tenancy.model")
var ObjectId = require('mongodb').ObjectID;


const getTanantRentReportByLondlordId = async (req, res) => {
    // res.send("hello")/
const landlordId = req.params.landlordId
console.log(landlordId  );
    
    try {

        let resultAll = await recordTenancyCollection.aggregate([
            { $match: { userId: landlordId } },
        ]).sort({createOn: 'desc'})
        console.log(resultAll,"jjjjjjjjjjjjjjjjjjj");
        if (!resultAll) {
            return res.status(200).send({
                message: "user is not exists",
                code: 422,
            });
        } else {
            return res.status(200).json({
                message: ' success  fullY',
                status: 200,
                data: resultAll
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

module.exports ={
    getTanantRentReportByLondlordId
}