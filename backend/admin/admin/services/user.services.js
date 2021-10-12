const userCollection = require("../../models/user.model")

const findOne = condition=>userCollection.findOne(condition)
const post = payload=> userCollection.create(payload)
const get = (conditions,skip,limit)=>userCollection  .find(conditions).skip(skip > 0 ? ((skip - 1) * limit) : 0).limit(limit);
const update = (condition,payload)=> userCollection.updateOne(condition,payload)
const deleteQuery = (condition)=> userCollection.findByIdAndDelete(condition)
const count = (condition) => userCollection.countDocuments(condition)

module.exports={
    findOne,
    post,
    get,
    update,
    deleteQuery ,
    count
}