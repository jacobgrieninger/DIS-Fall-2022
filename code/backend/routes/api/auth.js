const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   GET api/auth
// @desc    Attempt User Login
// @access  Public
router.get('/', [
    check('userID', 'User ID is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const userID = req.body.userID
        const storedPass = await User.findOne({userID}).select('password');
        const sentPass = req.body.password

        if (sentPass == storedPass.password) {
            res.status(200).send(storedPass.authlevel)
        } else {
            res.status(400).send("Password mismatch")
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;