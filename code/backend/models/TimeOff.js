const mongoose = require('mongoose');

const TimeOffSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true
    },
    leaveDate: {
        type: Date
    },
    returnDate: {
        type: Date
    }
});

module.exports = TimeOff = mongoose.model('TimeOff', TimeOffSchema);