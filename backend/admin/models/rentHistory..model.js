const mongoose = require('mongoose');
const rentReportHistorySchema = mongoose.Schema({
    allTenantData: {
        type: Array,

    },
    userId: {
        type: String
    },
    createOn: {
        type: String
    },
    selectProperties: {
        type: String
    },
    Units: {
        type: String
    },
    Price: {
        type: String
    },
    isDeleted: {
        type: Boolean
    },
    Month: {
        type: String
    },
    year: {
        type: String
    },
    Balance: {
        type: String
    },
    Status: {
        type: String
    }
});
module.exports = mongoose.model('rentReportHistory', rentReportHistorySchema)
