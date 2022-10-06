const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Schedule = require('../../models/Schedule');
const bcrypt = require('bcryptjs');

// @route   POST api/schedule
// @desc    Create Schedule
// @access  Public
router.post('/', [
    check('startDate', 'Start Date is required').not().isEmpty(),
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
    check('storeNumber', 'Store Number is required').not().isEmpty()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        startDate,
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
        storeNumber
    } = req.body;

    try {
        //see if sche exists
        let schedule = await Schedule.findOne({ startDate });
        if(schedule) {
            res.status(400).json({ errors: [{msg: 'Schedule already exists'}]});
        }

        schedule = new Schedule({
            startDate,
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
            storeNumber
        });


        await schedule.save();

        res.send('Schedule Created');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;