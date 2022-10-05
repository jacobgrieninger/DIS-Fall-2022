const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    storeNumber: {
        type: Number,
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
    }
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema);