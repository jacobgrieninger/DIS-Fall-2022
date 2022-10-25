import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as Helper from "./helpers";
import * as db from "./requests";
import * as Subcomponent from "./subcomponents";

const root = ReactDOM.createRoot(document.getElementById("stage"));

function Init() {
  root.render(<LoginPage />);
}

function LoginPage(props) {
  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
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
            <div className="col" style={{ textAlign: "left" }}>
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
            <div className="col" style={{ textAlign: "left" }}>
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
          <div style={{ margin: "auto", textAlign: "center" }}>
            <button
              id="loginBtn"
              onClick={async function() {
                const result = await db.login(userID, password);
                if (result.errors.value) {
                  setErrors(result.errors.info);
                } else {
                  if (result.auth === 0) {
                    root.render(<EmployeeHome ID={userID} />);
                  } else if (result.auth === 1) {
                    root.render(<ManagerHome ID={userID} />);
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Home</u>
        </p>
      </div>
      <div className="header">
        <p style={{ paddingTop: "5em" }}>Manager Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(<EmployeeManagement />);
                }}
              >
                Employee Management
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
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
                onClick={function() {
                  root.render(<StaticSchedules />);
                }}
              >
                Static Schedules
              </button>
            </div>
            <div className="col">
              <button className="menuBtn">Generate Schedule</button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>Employee Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button className="menuBtn">Time Off</button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(<WeeklyAvailablity />);
                }}
              >
                Weekly Availabilty
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "5em" }}></p>
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Home</u>
        </p>
      </div>

      <div className="header">
        <p style={{ paddingTop: "3em" }}>Employee Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                id="timeoffbtn"
                onClick={function() {
                  root.render(<TimeOff ID={props.ID} />);
                }}
              >
                Time Off
              </button>
            </div>
            <div className="col">
              <button className="menuBtn">Weekly Availabilty</button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "5em" }}></p>
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
  const [firstName, setFirstName] = useState("");
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Employee Management</u>
        </p>
      </div>
      <div className="buttonContainer" style={{ paddingBottom: "5em" }}>
        <div className="employeeContainer">
          <Subcomponent.DisplayEmployees
            usersList={usersList}
            setAction={setAction}
            setResetAlert={setResetAlert}
          />
          <div
            className={` ${resetAlert ? "alert-shown" : "alert-hidden"}`}
            onTransitionEnd={() => setResetAlert(false)}
            style={{ textAlign: "center" }}
          >
            Password Reset!
          </div>
        </div>
      </div>
      <div className="buttonContainer" style={{ paddingBottom: "1em" }}>
        <div className="employeeContainer">
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col">
              <div>Enter Name:</div>
              <input
                type="text"
                onChange={function(e) {
                  setFirstName(e.target.value);
                }}
              ></input>
              <div>(First name only)</div>
            </div>
            <div className="col">
              <div>Enter ID:</div>
              <input
                type="number"
                onWheel={function(e) {
                  e.target.blur();
                }}
                onChange={function(e) {
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
          onClick={async function() {
            const res = await db.createUser(firstName, enteredID, employeeType);
            console.log(res);
            if (typeof res === "string") {
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

function StoreManagement(props) {
  return (
    <div id="mainBox">
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Store Management</u>
        </p>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>8677</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: "1em" }}>
            <div className="col" style={{ width: "20em" }}>
              Sunday Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ width: "20em" }}>
              M-Sat Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>9200</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: "1em" }}>
            <div className="col" style={{ width: "20em" }}>
              Sunday Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
          </div>
          <div className="row">
            <div className="col" style={{ width: "20em" }}>
              M-Sat Hours
            </div>
            <div className="col colmesh">Open</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
            <div className="col colmesh">Close</div>
            <div className="col">
              <input type="text" style={{ width: "5em" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "5em" }}>
          <button>Save</button>
        </p>
      </div>
    </div>
  );
}

function WeeklyAvailablity(props) {
  return (
    <div id="mainBox">
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Weekly Availablity</u>
        </p>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>Sample Week</p>
      </div>
      <div className="calender" style={{ margin: "auto", width: "75%" }}>
        <div className="row gx-0">
          <div className="col dayBox">
            <div className="calenderHeader2">
              <u>Sunday</u>
              <br />
            </div>
            <div className="availContainer">
              <div
                id="sunday"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("sunday");
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
                id="mondayopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("mondayopen");
                }}
              >
                Open
              </div>
              <div
                id="mondayclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("mondayclose");
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
                id="tuesopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("tuesopen");
                }}
              >
                Open
              </div>
              <div
                id="tuesclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("tuesclose");
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
                id="wedopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("wedopen");
                }}
              >
                Open
              </div>
              <div
                id="wedclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("wedclose");
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
                id="thuopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("thuopen");
                }}
              >
                Open
              </div>
              <div
                id="thuclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("thuclose");
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
                id="friopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("friopen");
                }}
              >
                Open
              </div>
              <div
                id="friclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("friclose");
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
                id="satopen"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("satopen");
                }}
              >
                Open
              </div>
              <div
                id="satclose"
                className="shiftStyle notavail"
                onClick={function() {
                  Helper.AvailabiltyToggle("satclose");
                }}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>
          <button>Confirm</button>
        </p>
      </div>
    </div>
  );
}

function TimeOff(props) {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Time Off</u>
        </p>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>New Time Off Request</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{ paddingBottom: "1em", width: "35em" }}>
            <div className="col colmesh">Leave Date</div>
            <div className="col">
              <input
                type="date"
                style={{ width: "8em" }}
                onChange={function(e) {
                  let date = new Date(e.target.value);
                  setLeaveDate(date.toISOString());
                }}
              />
            </div>
            <div className="col colmesh">Return Date</div>
            <div className="col">
              <input
                type="date"
                style={{ width: "8em" }}
                onChange={function(e) {
                  let date = new Date(e.target.value);
                  setReturnDate(date.toISOString());
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "0em" }}>
          <button
            onClick={async function() {
              let res = await db.createTimeOff(props.ID, leaveDate, returnDate);
              if (typeof res === "string") {
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

function StaticSchedules(props) {
  const [staticSchedules, setStaticSchedules] = useState([]);
  const [actions, setAction] = useState(0);
  const [newSche, setNewSche] = useState({
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: "1em" }}>
          <u>Static Schedule</u>
        </p>
      </div>
      <Subcomponent.DisplayStaticSchedules staticSchedules={staticSchedules} />
      <br />
      <div className="calender" style={{ margin: "auto", width: "75%" }}>
        <div className="row gx-0">
          <div className="col dayBox">
            <div className="calenderHeader2">
              <u>Sunday</u>
              <br />
            </div>
            <div className="availContainer">
              <div
                className={`shiftStyle  ${
                  newSche.sunday ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.mondayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
                  setNewSche({ ...newSche, mondayOpen: !newSche.mondayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.mondayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.tuesdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
                  setNewSche({ ...newSche, tuesdayOpen: !newSche.tuesdayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.tuesdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.wednesdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.wednesdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.thursdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.thursdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.fridayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
                  setNewSche({ ...newSche, fridayOpen: !newSche.fridayOpen });
                }}
              >
                Open
              </div>
              <div
                className={`shiftStyle  ${
                  newSche.fridayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.saturdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  newSche.saturdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
        <select id="users" type="dropdown">
          <Subcomponent.EmployeeList />
        </select>
        <select id="stores" type="dropdown">
          <option>8677</option>
          <option>9200</option>
        </select>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>
          <button
            onClick={function() {
              setAction(Math.random());
            }}
          >
            Confirm
          </button>
        </p>
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
};
