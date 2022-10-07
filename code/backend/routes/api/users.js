const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   POST api/users
// @desc    Create User
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('userID', 'UserID is required').not().isEmpty(),
    check('password', 'Password is required, minimum length 4').isLength({min: 4})
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, userID, password, authlevel} = req.body;

    try {
        //see if user exists
        let user = await User.findOne({ userID })
        if(user) {
            res.status(400).json({ errors: [{msg: 'User already exists'}]});
        }

        user = new User({
            name,
            userID,
            password,
            authlevel
        });


        await user.save();

        res.send('User Created');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/user
// @desc    Get a user from ID, returns name and authlevel
// @access  Public
router.get('/', [
    check('userID', 'A userID is required.').not().isEmpty()
],
async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const userID = req.body.userID;
        const result = await User.findOne({userID});
        const response = {
            username: result.name,
            authlevel: result.authlevel
        }
        res.status(200).json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;