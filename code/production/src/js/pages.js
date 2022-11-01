import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
// eslint-disable-next-line
import * as Helper from './helpers';
import * as db from './requests';
import * as Subcomponent from './subcomponents';
import { GenerateSchedule } from './scheduler';

const root = ReactDOM.createRoot(document.getElementById('stage'));

function Init() {
  root.render(<LoginPage />);
}

function LoginPage(props) {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const DisplayErrors = () => {
    if (errors.length >= 1) {
      const errList = errors.map((err) => {
        return <p className="errorContainer">{err}</p>;
      });
      return errList;
    }
  };

  return (
    <div id="mainBoxLogin">
      <div className="header">GNC Wilmington</div>
      <div id="loginBox">
        <div>
          <DisplayErrors />
          <div className="row">
            <div className="col" style={{ textAlign: 'left' }}>
              Username:
            </div>
            <div className="col">
              <input
                type="text"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
                spellCheck="false"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col" style={{ textAlign: 'left' }}>
              Password:
            </div>
            <div className="col">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <br />
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <button
              id="loginBtn"
              onClick={async function () {
                const result = await db.login(userID, password);
                if (result.errors.value) {
                  setErrors(result.errors.info);
                } else {
                  if (result.auth === 0) {
                    root.render(<EmployeeHome ID={userID} auth={0} />);
                  } else if (result.auth === 1) {
                    root.render(<ManagerHome ID={userID} auth={1} />);
                  }
                }
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManagerHome(props) {
  return (
    <div id="mainBox">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col"></div>
          <div className="col">GNC Wilmington</div>
          <div className="col text-end">
            <button
              onClick={function () {
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <p className="header" style={{ paddingTop: '1em' }}>
        <u>Home</u>
      </p>
      <div className="header">
        <p style={{ paddingTop: '5em' }}>Manager Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(<EmployeeManagement />);
                }}
              >
                Employee Management
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(<StoreManagement />);
                }}
              >
                Store Management
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(<StaticSchedules />);
                }}
              >
                Static Schedules
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(<GenerateSchedules />);
                }}
              >
                Generate Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>Employee Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                id="timeoffbtn"
                onClick={function () {
                  root.render(<TimeOff ID={props.ID} auth={props.auth} />);
                }}
              >
                Time Off
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(
                    <WeeklyAvailablity ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Weekly Availabilty
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '5em' }}></p>
      </div>
      <div className="calenderViews">
        <div className="calender">
          <b>8677</b>
          <Subcomponent.DisplaySchedule storenum="8677" />
        </div>
        <div className="calender">
          <b>9200</b>
          <Subcomponent.DisplaySchedule storenum="9200" />
        </div>
      </div>
    </div>
  );
}

function EmployeeHome(props) {
  return (
    <div id="mainBox">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col"></div>
          <div className="col">GNC Wilmington</div>
          <div className="col text-end">
            <button
              onClick={function () {
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <p className="header" style={{ paddingTop: '1em' }}>
        <u>Home</u>
      </p>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>Employee Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                id="timeoffbtn"
                onClick={function () {
                  root.render(<TimeOff ID={props.ID} />);
                }}
              >
                Time Off
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
                  root.render(<WeeklyAvailablity ID={props.ID} />);
                }}
              >
                Weekly Availabilty
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '5em' }}></p>
      </div>
      <div className="calenderViews">
        <div className="calender">
          <b>8677</b>
          <Subcomponent.DisplaySchedule storenum="8677" />
        </div>
        <div className="calender">
          <b>9200</b>
          <Subcomponent.DisplaySchedule storenum="9200" />
        </div>
      </div>
    </div>
  );
}

function EmployeeManagement(props) {
  const [actions, setAction] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [enteredID, setEnteredID] = useState(0);
  const [employeeType, setEmployeeType] = useState(0);
  const [resetAlert, setResetAlert] = useState(false);

  useEffect(() => {
    async function getAllUsers() {
      const res = await db.getAllUsers();
      setUsersList(res);
    }
    getAllUsers();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome />}
        title="Employee Management"
        root={root}
      />
      <div className="buttonContainer" style={{ paddingBottom: '5em' }}>
        <div className="employeeContainer">
          <Subcomponent.DisplayEmployees
            usersList={usersList}
            setAction={setAction}
            setResetAlert={setResetAlert}
          />
          <div
            className={` ${resetAlert ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setResetAlert(false)}
            style={{ textAlign: 'center' }}
          >
            Password Reset!
          </div>
        </div>
      </div>
      <div className="buttonContainer" style={{ paddingBottom: '1em' }}>
        <div className="employeeContainer">
          <div className="row" style={{ textAlign: 'center' }}>
            <div className="col">
              <div>Enter Name:</div>
              <input
                type="text"
                onChange={function (e) {
                  setFirstName(e.target.value);
                }}
              ></input>
              <div>(First name only)</div>
            </div>
            <div className="col">
              <div>Enter ID:</div>
              <input
                type="number"
                onWheel={function (e) {
                  e.target.blur();
                }}
                onChange={function (e) {
                  setEnteredID(e.target.value);
                }}
              ></input>
            </div>
            <div className="col">
              <div>Select Employee Type</div>
              <div>
                <select
                  name="authLevel"
                  id=""
                  onChange={(e) => {
                    setEmployeeType(e.target.value);
                  }}
                >
                  <option value="0">Employee</option>
                  <option value="1">Manager</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <button
          onClick={async function () {
            const res = await db.createUser(firstName, enteredID, employeeType);
            console.log(res);
            if (typeof res === 'string') {
              setAction(Math.random());
            }
          }}
        >
          Add Employee
        </button>
      </div>
    </div>
  );
}

function GenerateSchedules(props) {
  const [actions, setAction] = useState(0);
  const [timeOffs, setTimeOffs] = useState([]);
  const [weeklyAvailabilites, setWeeklyAvailabilites] = useState([]);
  const [users, setUsers] = useState([]);
  const [staticSchedules, setStaticSchedules] = useState([]);
  const [resetAlert, setResetAlert] = useState(false);

  useEffect(() => {
    async function loadData() {
      setTimeOffs(await db.getAllTimeOffs());
      setWeeklyAvailabilites(await db.getAllWeeklyAvailability());
      setUsers(await db.getAllUsers());
      setStaticSchedules(await db.getAllStaticSchedules());
    }
    loadData();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome />}
        title="Generate Schedule"
        root={root}
      />
      <button
        onClick={function () {
          let date = new Date();
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          let input = {
            users: users,
            timeOffs: timeOffs,
            weeklyAvailabilites: weeklyAvailabilites,
            staticSchedules: staticSchedules,
            startDate: date,
          };
          console.log(GenerateSchedule(input));
        }}
      >
        Test
      </button>
    </div>
  );
}

function StoreManagement(props) {
  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome />}
        title="Employee Management"
        root={root}
      />
      <div className="header">
        <p style={{ paddingTop: '3em' }}>8677</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: '1em' }}>
            <div className="col" style={{ width: '20em' }}>
              Sunday Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ width: '20em' }}>
              M-Sat Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>9200</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: '1em' }}>
            <div className="col" style={{ width: '20em' }}>
              Sunday Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ width: '20em' }}>
              M-Sat Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: '5em' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '5em' }}>
          <button>Save</button>
        </p>
      </div>
    </div>
  );
}

function StaticSchedules(props) {
  const [staticSchedules, setStaticSchedules] = useState([]);
  const [actions, setAction] = useState(0);
  const [newSche, setNewSche] = useState({
    userID_: 0,
    sunday: false,
    mondayOpen: false,
    mondayClose: false,
    tuesdayOpen: false,
    tuesdayClose: false,
    wednesdayOpen: false,
    wednesdayClose: false,
    thursdayOpen: false,
    thursdayClose: false,
    fridayOpen: false,
    fridayClose: false,
    saturdayOpen: false,
    saturdayClose: false,
    storeNumber: 0,
  });

  useEffect(() => {
    async function getStaticSchedules() {
      const res = await db.getAllStaticSchedules(props.ID);
      console.log(res);
      setStaticSchedules(res);
    }
    getStaticSchedules();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome />}
        title="Static Schedules"
        root={root}
      />
      <Subcomponent.DisplayStaticSchedules
        staticSchedules={staticSchedules}
        setAction={setAction}
      />
      <br />
      <div
        className="calender"
        style={{ margin: 'auto', width: '75%', paddingTop: '10em' }}
      >
        <span>Create New Static Schedule</span>
        <div className="row gx-0">
          <div className="col dayBox">
            <div className="calenderHeader2">
              <u>Sunday</u>
              <br />
            </div>
            <div className="availContainer">
              <div
                className={`shiftStyle  ${
                  newSche.sunday ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, sunday: !newSche.sunday });
                }}
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
                className={`shiftStyle  ${
                  newSche.mondayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, mondayOpen: !newSche.mondayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.mondayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, mondayClose: !newSche.mondayClose });
                }}
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
                className={`shiftStyle  ${
                  newSche.tuesdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, tuesdayOpen: !newSche.tuesdayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.tuesdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    tuesdayClose: !newSche.tuesdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  newSche.wednesdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    wednesdayOpen: !newSche.wednesdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.wednesdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    wednesdayClose: !newSche.wednesdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  newSche.thursdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    thursdayOpen: !newSche.thursdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.thursdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    thursdayClose: !newSche.thursdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  newSche.fridayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, fridayOpen: !newSche.fridayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.fridayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({ ...newSche, fridayClose: !newSche.fridayClose });
                }}
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
                className={`shiftStyle  ${
                  newSche.saturdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    saturdayOpen: !newSche.saturdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.saturdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setNewSche({
                    ...newSche,
                    saturdayClose: !newSche.saturdayClose,
                  });
                }}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <select
          id="users"
          type="dropdown"
          onChange={function (e) {
            setNewSche({ ...newSche, userID_: e.target.value });
          }}
        >
          <Subcomponent.EmployeeList />
        </select>
        <select
          id="stores"
          type="dropdown"
          onChange={function (e) {
            setNewSche({ ...newSche, storeNumber: e.target.value });
          }}
        >
          <option selected> </option>
          <option>8677</option>
          <option>9200</option>
        </select>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>
          <button
            onClick={async function () {
              await db.createStaticSchedule(newSche);
              setAction(Math.random());
              setNewSche({
                userID_: 0,
                sunday: false,
                mondayOpen: false,
                mondayClose: false,
                tuesdayOpen: false,
                tuesdayClose: false,
                wednesdayOpen: false,
                wednesdayClose: false,
                thursdayOpen: false,
                thursdayClose: false,
                fridayOpen: false,
                fridayClose: false,
                saturdayOpen: false,
                saturdayClose: false,
                storeNumber: 0,
              });
            }}
          >
            Create
          </button>
        </p>
      </div>
    </div>
  );
}

function WeeklyAvailablity(props) {
  const [resetAlert, setResetAlert] = useState(false);
  const [actions, setAction] = useState(0);
  const [availability, setAvailability] = useState({
    userID_: props.ID,
    sunday: true,
    mondayOpen: true,
    mondayClose: true,
    tuesdayOpen: true,
    tuesdayClose: true,
    wednesdayOpen: true,
    wednesdayClose: true,
    thursdayOpen: true,
    thursdayClose: true,
    fridayOpen: true,
    fridayClose: true,
    saturdayOpen: true,
    saturdayClose: true,
  });

  useEffect(() => {
    async function getAvailability() {
      const res = await db.getWeeklyAvailability(props.ID);
      setAvailability(res);
    }
    getAvailability();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={props.auth ? <ManagerHome /> : <EmployeeHome />}
        title="Weekly Availability"
        root={root}
      />
      <div className="header">
        <p style={{ paddingTop: '3em' }}>Sample Week</p>
      </div>
      <div className="calender" style={{ margin: 'auto', width: '75%' }}>
        <div className="row gx-0">
          <div className="col dayBox">
            <div className="calenderHeader2">
              <u>Sunday</u>
              <br />
            </div>
            <div className="availContainer">
              <div
                className={`shiftStyle  ${
                  availability.sunday ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    sunday: !availability.sunday,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.mondayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    mondayOpen: !availability.mondayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.mondayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    mondayClose: !availability.mondayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.tuesdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    tuesdayOpen: !availability.tuesdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.tuesdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    tuesdayClose: !availability.tuesdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.wednesdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    wednesdayOpen: !availability.wednesdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.wednesdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    wednesdayClose: !availability.wednesdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.thursdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    thursdayOpen: !availability.thursdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.thursdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    thursdayClose: !availability.thursdayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.fridayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    fridayOpen: !availability.fridayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.fridayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    fridayClose: !availability.fridayClose,
                  });
                }}
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
                className={`shiftStyle  ${
                  availability.saturdayOpen ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    saturdayOpen: !availability.saturdayOpen,
                  });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  availability.saturdayClose ? 'isavail' : 'notavail'
                } `}
                onClick={function () {
                  setAvailability({
                    ...availability,
                    saturdayClose: !availability.saturdayClose,
                  });
                }}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>
          <button
            onClick={async function () {
              let res = await db.updateWeeklyAvailability(availability);
              console.log(res);
              setAction(Math.random());
              setResetAlert(true);
            }}
          >
            Update
          </button>
        </p>
        <div
          className={` ${resetAlert ? 'alert-shown' : 'alert-hidden'}`}
          onTransitionEnd={() => setResetAlert(false)}
          style={{ textAlign: 'center' }}
        >
          Availability Updated!
        </div>
      </div>
    </div>
  );
}

function TimeOff(props) {
  const [leaveDate, setLeaveDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [timeOffs, setTimeOffs] = useState([]);
  const [actions, setAction] = useState(0);

  useEffect(() => {
    async function getTimeOffs() {
      const res = await db.getTimeOffs(props.ID);
      setTimeOffs(res);
    }
    getTimeOffs();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={props.auth ? <ManagerHome /> : <EmployeeHome />}
        title="Time Off"
        root={root}
      />
      <div className="header">
        <p style={{ paddingTop: '3em' }}>New Time Off Request</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: '1em', width: '35em' }}>
            <div className="col colmesh">Leave Date</div>
            <div className="col">
              <input
                type="date"
                style={{ width: '8em' }}
                onChange={function (e) {
                  let date = new Date(e.target.value);
                  setLeaveDate(date.toISOString());
                }}
              />
            </div>
            <div className="col colmesh">Return Date</div>
            <div className="col">
              <input
                type="date"
                style={{ width: '8em' }}
                onChange={function (e) {
                  let date = new Date(e.target.value);
                  setReturnDate(date.toISOString());
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '0em' }}>
          <button
            onClick={async function () {
              let res = await db.createTimeOff(props.ID, leaveDate, returnDate);
              if (typeof res === 'string') {
                setAction(Math.random());
              }
            }}
          >
            Submit
          </button>
        </p>
      </div>
      <div>
        <Subcomponent.DisplayTimeOffs
          timeOffs={timeOffs}
          setAction={setAction}
        />
      </div>
    </div>
  );
}

export {
  Init,
  LoginPage,
  ManagerHome,
  EmployeeHome,
  EmployeeManagement,
  StoreManagement,
  GenerateSchedules,
};
