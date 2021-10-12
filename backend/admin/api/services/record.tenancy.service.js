const recordTenancyCollection = require("../../models/record.tenancy.model")
const saveEmailTokenCollection = require("../../models/emailToken.model")
const findOne = condition=>recordTenancyCollection.findOne(condition)
const post = payload=> recordTenancyCollection.create(payload)
const get = (condition,skip)=>recordTenancyCollection.find(condition).skip(skip > 0 ? ((skip - 1) * 20) : 0).limit(20).sort({createOn: 'desc'});
const update = (condition,payload)=> recordTenancyCollection.updateOne(condition,payload)
const count = (condition) => recordTenancyCollection.countDocuments (condition)
const postEmailToken = (payload) => saveEmailTokenCollection.create (payload)
const findOneToken = condition=>saveEmailTokenCollection.findOne(condition)
const DeleteToken =condition => saveEmailTokenCollection.deleteOne(condition)
const deleteTenancy = condition=>recordTenancyCollection.deleteOne(condition)

module.exports={
    findOne,
    post,
    get,
    update,
    count,
    postEmailToken,
    findOneToken,
    DeleteToken,
    deleteTenancy
}
