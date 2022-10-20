const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route   POST api/users
// @desc    Create User
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('userID', 'UserID is required').not().isEmpty(),
    check('password', 'Password is required, minimum length 4').isLength({
      min: 4,
    }),
    check('authlevel', 'Auth Level is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, userID, password, authlevel } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ userID });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        userID,
        password,
        authlevel,
      });

      await user.save();

      res.send('User Created');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/update
// @desc    Update User
// @access  Public
router.post(
  '/update',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('userID', 'UserID is required').not().isEmpty(),
    check('authlevel', 'Auth Level is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, userID, authlevel } = req.body;

    try {
      //see if user exists
      let storedResult = await User.findOne({ userID });
      if (!storedResult) {
        res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
      }

      let password = storedResult.password;
      let user = new User({
        name,
        userID,
        password,
        authlevel,
      });

      storedResult.overwrite(user);
      await storedResult.save();
      res.send('User Updated');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/resetpass
// @desc    Reset User Password
// @access  Public
router.post(
  '/resetpass',
  [check('userID', 'UserID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userID = req.body.userID;

    try {
      //see if user exists
      let storedResult = await User.findOne({ userID });
      if (!storedResult) {
        res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
      }

      const name = storedResult.name;
      const authlevel = storedResult.authlevel;
      const password = 'default';
      let user = new User({
        name,
        userID,
        password,
        authlevel,
      });

      storedResult.overwrite(user);
      await storedResult.save();
      res.send('Password Reset');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/changepass
// @desc    Change User Password
// @access  Public
router.post(
  '/changepass',
  [
    check('userID', 'UserID is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userID = req.body.userID;
    const password = req.body.password;

    try {
      //see if user exists
      let storedResult = await User.findOne({ userID });
      if (!storedResult) {
        res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
      }

      const name = storedResult.name;
      const authlevel = storedResult.authlevel;
      let user = new User({
        name,
        userID,
        password,
        authlevel,
      });

      storedResult.overwrite(user);
      await storedResult.save();
      res.send('Password Updated');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/users/delete
// @desc    Delete User
// @access  Public
router.post(
  '/delete',
  [check('userID', 'UserID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userID = req.body.userID;
    try {
      let check = await User.findOne({ userID });
      if (!check) {
        res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
      }
      await User.findOneAndDelete({ userID });
      res.send('User Deleted');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/user
// @desc    Get a user from ID, returns name and authlevel
// @access  Public
router.get(
  '/',
  [check('userID', 'A userID is required.').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userID = req.body.userID;
      const result = await User.findOne({ userID });
      const response = {
        username: result.name,
        authlevel: result.authlevel,
      };
      res.status(200).json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/user/all
// @desc    Get alls users, returns name and authlevel
// @access  Public
router.post('/all', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
