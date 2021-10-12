const mongoose = require('mongoose');
const homePageSchema = mongoose.Schema({
    creditProofServicesEnglish: { type: String },
    creditProofServicesFrench: { type: String },
    creditProofServicesImage: { type: String },

    registerYourselfEnglish: {type: String},
    registerYourselfFrench:{type: String},

    verifyCreditscoreEnglish:{type:String},
    verifyCreditscoreFrench: {type: String},

    reviewYourlandlordEnglish:{type: String},
    reviewYourlandlordFrench:{type:String},
    registerYourselfImage: {type: String},
    verifyCreditscoreImage:{type: String},
    reviewYourlandlordImage:{type:String},
    number: { type: String },
    
    email: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },

    createOn: { type: Date },
    updateOn: { type: Date }
});
module.exports = mongoose.model('homePage', homePageSchema)