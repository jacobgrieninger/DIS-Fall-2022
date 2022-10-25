const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const StaticSchedule = require('../../models/StaticSchedule');
const bcrypt = require('bcryptjs');

// @route   POST api/staticSchedule
// @desc    Create / Recreate Static Schedule
// @access  Public
router.post(
  '/',
  [
    check('userID', 'UserID is required').not().isEmpty(),
    check('sunday', 'Sunday shift required').not().isEmpty(),
    check('mondayOpen', 'Monday Open shift required').not().isEmpty(),
    check('mondayClose', 'Monday Close shift required').not().isEmpty(),
    check('tuesdayOpen', 'Tuesday Open shift required').not().isEmpty(),
    check('tuesdayClose', 'Tuesday Close shift required').not().isEmpty(),
    check('wednesdayOpen', 'Wednesday Open shift required').not().isEmpty(),
    check('wednesdayClose', 'Wednesday Close shift required').not().isEmpty(),
    check('thursdayOpen', 'Thursday Open shift required').not().isEmpty(),
    check('thursdayClose', 'Thursday Close shift required').not().isEmpty(),
    check('fridayOpen', 'Friday Open shift required').not().isEmpty(),
    check('fridayClose', 'Friday Close shift required').not().isEmpty(),
    check('saturdayOpen', 'Saturday Open shift required').not().isEmpty(),
    check('saturdayClose', 'Saturday Close shift required').not().isEmpty(),
    check('storeNumber', 'Store Number is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {
      userID,
      sunday,
      mondayOpen,
      mondayClose,
      tuesdayOpen,
      tuesdayClose,
      wednesdayOpen,
      wednesdayClose,
      thursdayOpen,
      thursdayClose,
      fridayOpen,
      fridayClose,
      saturdayOpen,
      saturdayClose,
      storeNumber,
    } = req.body;

    try {
      //see if sche exists
      let staticSchedule = await StaticSchedule.findOne({ userID });
      if (staticSchedule) {
        await StaticSchedule.findOneAndDelete({ userID });
        var returnMsg = 'Static Schedule Updated';
      } else {
        var returnMsg = 'Static Schedule Created';
      }

      staticSchedule = new StaticSchedule({
        userID,
        sunday,
        mondayOpen,
        mondayClose,
        tuesdayOpen,
        tuesdayClose,
        wednesdayOpen,
        wednesdayClose,
        thursdayOpen,
        thursdayClose,
        fridayOpen,
        fridayClose,
        saturdayOpen,
        saturdayClose,
        storeNumber,
      });

      await staticSchedule.save();

      res.send(returnMsg);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/schedule/delete
// @desc    Delete Schedule
// @access  Public
router.post(
  '/delete',
  [check('_id', 'A Static Schedule ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const _id = req.body._id;
      await StaticSchedule.findByIdAndDelete({ _id });
      res.status(200).send('Schedule Deleted');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/schedule/bydate
// @desc    Get Schedules by date
// @access  Public
router.get(
  '/byuser',
  [check('userID', 'A userID is required.').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userID = req.body.userID;
      const result = await StaticSchedule.find({ userID });
      res.status(200).json(result);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/schedule/all
// @desc    Get all Schedules
// @access  Public
router.get('/all', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  }
  try {
    const result = await StaticSchedule.find();
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.send('Server Error');
  }
});

module.exports = router;
