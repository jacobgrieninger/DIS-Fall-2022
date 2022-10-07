const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const TimeOff = require('../../models/TimeOff');
const bcrypt = require('bcryptjs');

// @route   POST api/timeoff
// @desc    Create time off
// @access  Public
router.post('/', [
    check('userID', 'User ID is required').not().isEmpty(),
    check('leaveDate', 'A leave date is required').not().isEmpty(),
    check('returnDate', 'A return date is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {
            userID,
            leaveDate,
            returnDate
        } = req.body;

        const timeoff = new TimeOff({
            userID,
            leaveDate,
            returnDate
        });

        await timeoff.save();
        res.status(200).send('Time Off created')

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;