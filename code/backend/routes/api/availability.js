const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Availability = require("../../models/Availability");

// @route   POST api/availability
// @desc    Create / Update Availability
// @access  Public
router.post(
  "/",
  [
    check("employeeID", "EmployeeID is required").not().isEmpty(),
    check("sunday", "Sunday availability required").not().isEmpty(),
    check("mondayOpen", "Monday Open availability required").not().isEmpty(),
    check("mondayClose", "Monday Close availability required").not().isEmpty(),
    check("tuesdayOpen", "Tuesday Open availability required").not().isEmpty(),
    check("tuesdayClose", "Tuesday Close availability required")
      .not()
      .isEmpty(),
    check("wednesdayOpen", "Wednesday Open availability required")
      .not()
      .isEmpty(),
    check("wednesdayClose", "Wednesday Close availability required")
      .not()
      .isEmpty(),
    check("thursdayOpen", "Thursday Open availability required")
      .not()
      .isEmpty(),
    check("thursdayClose", "Thursday Close availability required")
      .not()
      .isEmpty(),
    check("fridayOpen", "Friday Open availability required").not().isEmpty(),
    check("fridayClose", "Friday Close availability required").not().isEmpty(),
    check("saturdayOpen", "Saturday Open availability required")
      .not()
      .isEmpty(),
    check("saturdayClose", "Saturday Close availability required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    let {
      employeeID,
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
    } = req.body;

    try {
      let availability = new Availability({
        employeeID,
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
      });
      let resMessage = "Availability ";

      //check if avail exists
      let check = await Availability.findOne({ employeeID });
      if (check) {
        //update instead of create
        resMessage = resMessage + "Updated";
        check.overwrite(availability);
        await check.save();
      } else {
        resMessage = resMessage + "Created";
        await availability.save();
      }

      res.send(resMessage);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

// @route   GET api/availability
// @desc    GET Availability
// @access  Public

router.post(
  "/get",
  [check("employeeID", "A employeeID is required.").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }
    try {
      const employeeID = req.body.employeeID;
      const result = await Availability.findOne({ employeeID });
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

// @route   GET api/availability
// @desc    GET Availability
// @access  Public

router.post("/getall", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: errors.array() });
  }
  try {
    const result = await Availability.find({});
    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
