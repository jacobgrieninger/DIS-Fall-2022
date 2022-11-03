import React, { useState, useEffect, Fragment } from "react";
import * as Helper from "./helpers";
import * as db from "./requests";

const DisplaySchedule = (props) => {
  const [schedule, setSchedule] = useState({});
  const [users, setUsers] = useState({});
  const [actions, setAction] = useState(0);
  const weekdates = Helper.BuildWeek(Helper.FindNearestSunday(1));

  useEffect(() => {
    async function loadData() {
      setUsers(await db.getAllUsers());
      let schedules = await db.getScheduleByDate(
        Helper.FindNearestSunday().slice(0, 10)
      );
      schedules.forEach((sch) => {
        if (sch.storeNumber === props.storenum) {
          setSchedule(sch);
        }
      });
    }
    loadData();
    // eslint-disable-next-line
  }, [actions]);
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

const GetNameFromID = (users_, userID_) => {
  let result = "";
  Array.prototype.forEach.call(users_, (user) => {
    if (parseInt(userID_) === parseInt(user.userID)) {
      result = user.name;
    }
  });
  return result;
};

const DisplayTimeOffs = (props) => {
  const ConvertDate = (old) => {
    let date = new Date(old);
    return <Fragment>{date.toISOString().slice(0, 10)}</Fragment>;
  };
  const result = props.timeOffs.map((to_) => {
    return (
      <div key={to_._id} className="row">
        <div className="col">Leave Date: {ConvertDate(to_.leaveDate)}</div>
        <div className="col">Return Date: {ConvertDate(to_.returnDate)}</div>
        <div className="col">
          <button
            onClick={async function() {
              await db.delteTimeOff(to_._id);
              props.setAction(Math.random());
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
  return result;
};

const DisplayEmployees = (props) => {
  const result = props.usersList.map((user) => {
    if (user.userID !== props.currentUser) {
      return (
        <div key={user._id} className="row" style={{ height: "3em" }}>
          <div className="col">{user.name}</div>
          <div className="col">{user.userID}</div>
          <div className="col">
            <select
              name="authLevel"
              id=""
              defaultValue={user.authlevel.toString()}
            >
              <option value="0">Employee</option>
              <option value="1">Manager</option>
            </select>
          </div>
          <div className="col">
            <button
              style={{ width: "10em" }}
              onClick={async function() {
                await db.resetUserPass(user.userID);
                props.setResetAlert(true);
              }}
            >
              Reset Password
            </button>
          </div>
          <div className="col">
            <button
              style={{ width: "10em" }}
              onClick={async function() {
                await db.deleteUser(user.userID);
                await db.deleteWeeklyAvailability(user.userID);
                props.setAction(Math.random());
              }}
            >
              Delete Employee
            </button>
          </div>
        </div>
      );
    } else {
      return <Fragment key={user.id}></Fragment>;
    }
  });
  return result;
};

const DisplayStaticSchedules = (props) => {
  const [userList, setUserList] = useState({});
  // eslint-disable-next-line
  const [actionsUser, setActionsUser] = useState(0);

  useEffect(() => {
    async function getUsers() {
      let result = await db.getAllUsers();
      setUserList(result);
    }
    getUsers();
  }, [actionsUser]);

  const result = props.staticSchedules.map((schedule) => {
    return (
      <Fragment key={schedule._id}>
        <div className="calender" style={{ margin: "auto", width: "75%" }}>
          <b>{GetNameFromID(userList, schedule.userID)}</b> ({schedule.userID})
          - <b>{schedule.storeNumber}</b>
          <span style={{ textAlign: "right" }}>
            <button
              onClick={async function() {
                await db.deleteStaticSchedule(schedule._id);
                props.setAction(Math.random());
              }}
            >
              Delete
            </button>
          </span>
          <div className="row gx-0">
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Sunday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="sunday"
                  className={`shiftStyle  ${
                    schedule.sunday ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Monday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="mondayopen"
                  className={`shiftStyle  ${
                    schedule.mondayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="mondayclose"
                  className={`shiftStyle  ${
                    schedule.mondayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Tuesday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="tuesopen"
                  className={`shiftStyle  ${
                    schedule.tuesdayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="tuesclose"
                  className={`shiftStyle  ${
                    schedule.tuesdayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Wednesday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="wedopen"
                  className={`shiftStyle  ${
                    schedule.wednesdayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="wedclose"
                  className={`shiftStyle  ${
                    schedule.wednesdayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Thursday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="thuopen"
                  className={`shiftStyle  ${
                    schedule.thursdayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="thuclose"
                  className={`shiftStyle  ${
                    schedule.thursdayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Friday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="friopen"
                  className={`shiftStyle  ${
                    schedule.fridayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="friclose"
                  className={`shiftStyle  ${
                    schedule.fridayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
            <div className="col dayBox">
              <div className="calenderHeader2">
                <u>Saturday</u>
                <br />
              </div>
              <div className="availContainer">
                <div
                  id="satopen"
                  className={`shiftStyle  ${
                    schedule.saturdayOpen ? "isavail" : "notavail"
                  } `}
                >
                  Open
                </div>
                <div
                  id="satclose"
                  className={`shiftStyle  ${
                    schedule.saturdayClose ? "isavail" : "notavail"
                  } `}
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  });
  return result;
};

const EmployeeList = (props) => {
  const [result, setResult] = useState([]);
  // eslint-disable-next-line
  const [actions, setActions] = useState(0);

  useEffect(() => {
    async function getUsers() {
      const res = await db.getAllUsers();
      const result = res.map((user) => {
        return (
          <option key={user._id} value={user.userID}>
            {user.name}
          </option>
        );
      });
      setResult(result);
    }
    getUsers();
  }, [actions]);

  return result;
};

const MainHeader = (props) => {
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col text-start">
            <button
              onClick={function() {
                props.root.render(props.back);
              }}
            >
              Back
            </button>
          </div>
          <div className="col">GNC Wilmington</div>
          <div className="col text-end">
            <button
              onClick={function() {
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <p className="header" style={{ paddingTop: "1em" }}>
        <u>{props.title}</u>
      </p>
    </Fragment>
  );
};

const Footer = (props) => {
  return <div style={{ height: "5em" }}></div>;
};

const DisplayGenerateSchedule = (props) => {
  let week = "     ";
  if (props.startDate.length !== 0) {
    week = Helper.BuildWeek(props.startDate);
  }
  return (
    <div className="container">
      <div className="row text-center">
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Sunday
              <div>{week[0]}</div>
            </div>
            <div className="col tall">
              <div>{GetNameFromID(props.users, props.result.sunday)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      sunday: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.sunday}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Monday
              <div>{week[1]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>{GetNameFromID(props.users, props.result.mondayOpen)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      mondayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.mondayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>{GetNameFromID(props.users, props.result.mondayClose)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      mondayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.mondayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Tuesday
              <div>{week[2]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>{GetNameFromID(props.users, props.result.tuesdayOpen)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      tuesdayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.tuesdayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>{GetNameFromID(props.users, props.result.tuesdayClose)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      tuesdayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.tuesdayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Wednesday
              <div>{week[3]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>
                {GetNameFromID(props.users, props.result.wednesdayOpen)}
              </div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      wednesdayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.wednesdayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>
                {GetNameFromID(props.users, props.result.wednesdayClose)}
              </div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      wednesdayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.wednesdayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Thursday
              <div>{week[4]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>{GetNameFromID(props.users, props.result.thursdayOpen)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      thursdayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.thursdayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>
                {GetNameFromID(props.users, props.result.thursdayClose)}
              </div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      thursdayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.thursdayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Friday
              <div>{week[5]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>{GetNameFromID(props.users, props.result.fridayOpen)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      fridayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.fridayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>{GetNameFromID(props.users, props.result.fridayClose)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      fridayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.fridayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col bdrA">
          <div className="row flex-column">
            <div className="col" style={{ borderBottom: "1px solid black" }}>
              Saturday
              <div>{week[6]}</div>
            </div>
            <div
              className="col tall"
              style={{ borderBottom: "1px solid black" }}
            >
              <div>{GetNameFromID(props.users, props.result.saturdayOpen)}</div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      saturdayOpen: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.saturdayOpen}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
            <div className="col tall">
              <div>
                {GetNameFromID(props.users, props.result.saturdayClose)}
              </div>
              <div>
                <select
                  onChange={function(e) {
                    props.setResult({
                      ...props.result,
                      saturdayClose: e.target.value,
                    });
                  }}
                >
                  <AvailableEmployeeList
                    input={props.input.saturdayClose}
                    users={props.users}
                  />
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AvailableEmployeeList = (props) => {
  const result = props.input.map((user) => {
    return (
      <option key={user} value={user}>
        {GetNameFromID(props.users, user)}
      </option>
    );
  });
  return result;
};

export {
  DisplaySchedule,
  DisplayTimeOffs,
  DisplayEmployees,
  DisplayStaticSchedules,
  EmployeeList,
  MainHeader,
  Footer,
  DisplayGenerateSchedule,
};
