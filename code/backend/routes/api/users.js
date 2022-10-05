const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   GET api/users
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

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // return jsonwebtoken (video 11, may not be needed, skipping for now)

        res.send('User Created');
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;