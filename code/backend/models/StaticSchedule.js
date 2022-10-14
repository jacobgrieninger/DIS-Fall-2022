const mongoose = require('mongoose');

const StaticScheduleSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  sunday: {
    type: Boolean,
  },
  mondayOpen: {
    type: Boolean,
  },
  mondayClose: {
    type: Boolean,
  },
  tuesdayOpen: {
    type: Boolean,
  },
  tuesdayClose: {
    type: Boolean,
  },
  wednesdayOpen: {
    type: Boolean,
  },
  wednesdayClose: {
    type: Boolean,
  },
  thursdayOpen: {
    type: Boolean,
  },
  thursdayClose: {
    type: Boolean,
  },
  fridayOpen: {
    type: Boolean,
  },
  fridayClose: {
    type: Boolean,
  },
  saturdayOpen: {
    type: Boolean,
  },
  saturdayClose: {
    type: Boolean,
  },
  storeNumber: {
    type: Number,
    required: true,
  },
});

module.exports = StaticSchedule = mongoose.model(
  'staticSchedule',
  StaticScheduleSchema
);
