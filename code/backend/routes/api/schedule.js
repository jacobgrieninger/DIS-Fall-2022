const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Schedule = require('../../models/Schedule');
const bcrypt = require('bcryptjs');

// @route   POST api/schedule
// @desc    Create / Recreate Schedule
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
    let {
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

    if (storeNumber == 8677) {
        startDate = startDate + " 01:00";
    } else if (storeNumber == 9200) {
        startDate = startDate + " 05:00";
    }

    try {
        //see if sche exists
        let schedule = await Schedule.findOne({ startDate });
        if(schedule) {
            await Schedule.findOneAndDelete({ startDate });
            var returnMsg = "Schedule Updated";
        } else {
            var returnMsg = "Schedule Created";
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

        res.send(returnMsg);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/schedule/delete
// @desc    Delete Schedule
// @access  Public
router.post('/delete', [
    check('_id', 'A time off ID is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const _id = req.body._id; 
        await Schedule.findByIdAndDelete({_id});

        res.status(200).send('Schedule Deleted')

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/schedule/bydate
// @desc    Get Schedules by date
// @access  Public
router.get('/bydate', [
    check('date', 'An entry date is required.').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const entryDate = req.body.date;
        const result = await Schedule.find({entryDate});
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

// @route   GET api/schedule/all
// @desc    Get all Schedules
// @access  Public
router.get('/all', async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const result = await Schedule.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});


module.exports = router;