const mongoose = require('mongoose');
const happyClientSchema = mongoose.Schema({
    clientsName: {type: String},
    clientImage:{type: String},
    clientsTextInEnglish:{type:String},
    clientsTextInFrench:{type:String},

});
module.exports = mongoose.model('happyClientSchema', happyClientSchema)