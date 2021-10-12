const properitesCollection = require("../../models/properties.model")

const findOne = condition=>properitesCollection.findOne(condition)
const post = payload=> properitesCollection.create(payload)
const get = (condition,skip)=>properitesCollection.find(condition).skip(skip > 0 ? ((skip - 1) * 3) : 0).limit(3).sort({createOn: 'desc'});
const update = (condition,payload)=> properitesCollection.updateOne(condition,payload)
const count = (condition) => properitesCollection.countDocuments(condition)
const deleteQuery = (condition)=> userCollection.findByIdAndDelete(condition)

module.exports={
    findOne,
    post,
    get,
    update,
    count,
    deleteQuery
}
