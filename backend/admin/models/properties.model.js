const mongoose = require('mongoose');
const propertiesSchema = mongoose.Schema({
    Address: {
        type: String,
        
    },
    City: {
        type: String,
        
    },
    Country: {
        type: String,
       
    },
    Province: {
        type: String,
    
    },
    PostalCode: {
        type: String,
       
    },
    PropertieNickName:{
        type:String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    Units: [{
        Suite: { type: String, required: true },
        type: { type: String, required: true },
        Bedrooms: { type: String, required: true },
    }],
    userId: {
        type: String,
        required: true
    },
    createOn: {
        type: Date
    },
    updateOn: {
        type: Date
    }
});
module.exports = mongoose.model('properties', propertiesSchema)
