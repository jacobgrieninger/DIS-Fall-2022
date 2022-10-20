const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const TimeOff = require('../../models/TimeOff');
const bcrypt = require('bcryptjs');

// @route   POST api/timeoff
// @desc    Create time off
// @access  Public
router.post(
  '/',
  [
    check('userID', 'User ID is required').not().isEmpty(),
    check('leaveDate', 'A leave date is required').not().isEmpty(),
    check('returnDate', 'A return date is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const { userID, leaveDate, returnDate } = req.body;

      const timeoff = new TimeOff({
        userID,
        leaveDate,
        returnDate,
      });

      await timeoff.save();
      res.send('Time Off Created');
    } catch (err) {
      console.log(err.message);
      res.send('Server Error');
    }
  }
);

// @route   POST api/timeoff/delete
// @desc    Delete time off
// @access  Public
router.post(
  '/delete',
  [check('_id', 'A time off ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const _id = req.body._id;
      await TimeOff.findByIdAndDelete({ _id });

      res.status(200).send('Time Off Deleted');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/timeoff/getall
// @desc    Get all time off requests by userID
// @access  Public
router.post(
  '/getall',
  [check('userID', 'User ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const userID = req.body.userID;

      const result = await TimeOff.find({ userID });

      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.send('Server Error');
    }
  }
);

module.exports = router;
