const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   GET api/auth
// @desc    Attempt User Login
// @access  Public
router.post(
  '/',
  [
    check('userID', 'User ID is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const payload = {
      errors: {
        value: false,
        info: [],
      },
      auth: '',
    };
    if (!errors.isEmpty()) {
      payload.errors.value = true;
      errors.array().forEach((err) => {
        payload.errors.info.push(err.msg);
      });
      return res.send(payload);
    }
    try {
      const userID = req.body.userID;
      const storedPass = await User.findOne({ userID });
      const sentPass = req.body.password;

      if (storedPass != null) {
        if (sentPass == storedPass.password) {
          payload.auth = storedPass.authlevel;
          res.send(payload);
        } else {
          payload.errors.value = true;
          payload.errors.info = ['Password incorrect'];
          res.send(payload);
        }
      } else {
        payload.errors.value = true;
        payload.errors.info = ['UserID not found'];
        res.send(payload);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
