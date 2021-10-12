const mongoose = require('mongoose');
// const profileImg = require("../../public/images/avatar/2.jpg")


const userSchema = mongoose.Schema({
    fullName: {
        type: String,

    },
    FirstName:{
        type:String
    },
    lastName:{
        type:String
    },
    address: {
        type: String
    },
    email: {
        type: String,

    },
    phoneNumber: {
        type: String,

    },
    creditCard: {
        type: String
    },
    password: {
        type: String,

    },
    role: {
        type: String,
        enum: [1, 2, 3],
        default: 2
    },
    status: Number,
    profile_img: {
        type: String,
        default:"U9LXBpYFl-linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg"
    },
    created_at: Date,
    updated_at: Date,
    isDeleted: { type: Boolean, default: false },
    resetToken: {
        type: String
    },
    expireToken: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Active", "Deactive"],
        default: "Active"
    }
    ,
    documentType: {
        type: String,

    },
    termsAndCondition:{
        type:String
    },
    address2: {
        type: String,
    },

    city: {
        type: String,

    },
    province: {
        type: String,

    },
    postalCode: {
        type: String,

    },
    country: {
        type: String,

    },
    tenancyId: {
        type: String
    },
    landlordId:{
        type:String
    },
    document: {
        type: Array
    },
    latlng: {
        type: String
    }
});
module.exports = mongoose.model('user', userSchema)




