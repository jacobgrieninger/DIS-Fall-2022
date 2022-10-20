import React, { useState, useEffect } from 'react';
import * as Helper from './helpers';
import * as db from './requests';

const DisplaySchedule = (storenum) => {
  const [schedule, setSchedule] = useState({});
  const [users, setUsers] = useState({});
  const weekdates = Helper.BuildWeek(Helper.FindNearestSunday(1));
  useEffect(() => {
    async function getSchedule() {
      if (JSON.stringify(schedule) === '{}') {
        let result = await db.getScheduleByDate(Helper.FindNearestSunday());
        result.forEach((obj) => {
          if (obj.storeNumber.toString() === storenum.storenum) {
            setSchedule(obj);
          }
        });
      }
    }
    getSchedule();
  });

  useEffect(() => {
    async function getUsers() {
      if (JSON.stringify(users) === '{}') {
        let result = await db.getAllUsers();
        setUsers(result);
      }
    }
    getUsers();
  });

  const result = (
    <div className="row gx-0">
      <div className="col dayBox">
        <u>Sunday</u>
        <br />
        {weekdates[0]}
        <div className="shiftContainer">
          <div className="employeeDisplaySunday bdrS">
            {GetNameFromID(users, schedule.sunday)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Monday</u>
        <br />
        {weekdates[1]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.mondayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.mondayClose)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Tuesday</u>
        <br />
        {weekdates[2]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.tuesdayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.tuesdayClose)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Wednesday</u>
        <br />
        {weekdates[3]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.wednesdayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.wednesdayClose)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Thursday</u>
        <br />
        {weekdates[4]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.thursdayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.thursdayClose)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Friday</u>
        <br />
        {weekdates[5]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.fridayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.fridayClose)}
          </div>
        </div>
      </div>
      <div className="col dayBox">
        <u>Saturday</u>
        <br />
        {weekdates[6]}
        <div className="shiftContainer">
          <div className="employeeDisplay bdr">
            {GetNameFromID(users, schedule.saturdayOpen)}
          </div>
          <div className="employeeDisplay">
            {GetNameFromID(users, schedule.saturdayClose)}
          </div>
        </div>
      </div>
    </div>
  );
  return result;
};

function GetNameFromID(users_, userID_) {
  let result = '';
  Array.prototype.forEach.call(users_, (user) => {
    if (userID_ === user.userID) {
      result = user.name.toString();
    }
  });
  return result;
}

export { DisplaySchedule };
