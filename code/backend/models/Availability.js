const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    employeeID: {
        type: Number,
        unique: true,
        required: true
    },
    sunday: {
        type: Boolean
    },
    mondayOpen: {
        type: Boolean
    },
    mondayClose: {
        type: Boolean
    },
    tuesdayOpen: {
        type: Boolean
    },
    tuesdayClose: {
        type: Boolean
    },
    wednesdayOpen: {
        type: Boolean
    },
    wednesdayClose: {
        type: Boolean
    },
    thursdayOpen: {
        type: Boolean
    },
    thursdayClose: {
        type: Boolean
    },
    fridayOpen: {
        type: Boolean
    },
    fridayClose: {
        type: Boolean
    },
    saturdayOpen: {
        type: Boolean
    },
    saturdayClose: {
        type: Boolean
    }
});

module.exports = Availability = mongoose.model('availability', AvailabilitySchema);