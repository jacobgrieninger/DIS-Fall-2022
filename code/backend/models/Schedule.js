const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        unique: true,
        required: true
    },
    sunday: {
        type: Number
    },
    mondayOpen: {
        type: Number
    },
    mondayClose: {
        type: Number
    },
    tuesdayOpen: {
        type: Number
    },
    tuesdayClose: {
        type: Number
    },
    wednesdayOpen: {
        type: Number
    },
    wednesdayClose: {
        type: Number
    },
    thursdayOpen: {
        type: Number
    },
    thursdayClose: {
        type: Number
    },
    fridayOpen: {
        type: Number
    },
    fridayClose: {
        type: Number
    },
    saturdayOpen: {
        type: Number
    },
    saturdayClose: {
        type: Number
    },
    storeNumber: {
        type: Number,
        required: true
    }
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);