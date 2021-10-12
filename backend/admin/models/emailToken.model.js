const mongoose = require('mongoose');
const emailToken = mongoose.Schema({
    landlordId: {
        type: String,
        reqired: true
    },
    expireToken: {
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
module.exports = mongoose.model('emailToken', emailToken)