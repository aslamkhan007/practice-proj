const userCollection = require("../../models/user.model")

const findOne = condition=>userCollection.findOne(condition)
const post = payload=> userCollection.create(payload)
const get = (condition)=>userCollection.find(condition)
const update = (condition,payload)=> userCollection.updateOne(condition,payload)

module.exports={
    findOne,
    post,
    get,
    update
}
