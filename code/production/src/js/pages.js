import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line
import * as Helper from "./helpers";
import * as db from "./requests";
import * as Subcomponent from "./subcomponents";
import { GenerateSchedule } from "./scheduler";

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
        return (
          <div
            className="alert alert-danger text-center"
            role="alert"
            style={{
              width: "50%",
              margin: "1em auto 1em auto",
            }}
          >
            {err}
          </div>
        );
      });
      return errList;
    }
  };

  return (
    <div id="mainBoxLogin">
      <div className="header">
        <img style={{ height: "2em" }} src="gnclogo.svg" />
        <div>
          <h5>Wilmington</h5>
        </div>
      </div>
      <div id="loginBox" style={{ paddingBottom: "10em" }}>
        <div className="container" style={{ width: "40%" }}>
          <DisplayErrors />
          <div className="row align-items-center">
            <div className="col text-end">User ID:</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={userID}
                onChange={(e) => {
                  setuserID(e.target.value);
                }}
                spellCheck="false"
              />
            </div>
            <div className="col"></div>
          </div>
          <br />
          <div className="row align-items-center">
            <div className="col text-end">Password:</div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col"></div>
          </div>
          <br />
          <div style={{ margin: "auto", textAlign: "center" }}>
            <button
              id="loginBtn"
              className="btn btn-light"
              onClick={async function() {
                const result = await db.login(parseInt(userID), password);
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
        <div className="row text-center" style={{ paddingTop: "5px" }}>
          <div className="col"></div>
          <div className="col">
            <img style={{ height: "2em" }} src="gnclogo.svg" />
            <div>
              <h5>Wilmington</h5>
            </div>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-outline-secondary btn-sm"
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
        <u>Home</u>
      </p>
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
                  root.render(
                    <EmployeeManagement ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Employee Management
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(
                    <StaticSchedules ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Static Schedules
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button className="menuBtn">Previous Schedules</button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(
                    <GenerateSchedules ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Generate Schedule
              </button>
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
              <button
                className="menuBtn"
                id="timeoffbtn"
                onClick={function() {
                  root.render(<TimeOff ID={props.ID} auth={props.auth} />);
                }}
              >
                Time Off
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(
                    <WeeklyAvailablity ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Weekly Availabilty
              </button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
                  root.render(
                    <EmployeeOptions ID={props.ID} auth={props.auth} />
                  );
                }}
              >
                Employee Options
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
          <Subcomponent.DisplaySchedule storenum={8677} />
        </div>
        <div className="calender">
          <b>9200</b>
          <Subcomponent.DisplaySchedule storenum={9200} />
        </div>
      </div>
      <Subcomponent.Footer />
    </div>
  );
}

function EmployeeHome(props) {
  return (
    <div id="mainBox">
      <div className="container-fluid">
        <div className="row text-center" style={{ paddingTop: "5px" }}>
          <div className="col"></div>
          <div className="col">
            <img style={{ height: "2em" }} src="gnclogo.svg" />
            <div>
              <h5>Wilmington</h5>
            </div>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-outline-secondary btn-sm"
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
        <u>Home</u>
      </p>
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
                  root.render(<TimeOff ID={props.ID} auth={props.auth} />);
                }}
              >
                Time Off
              </button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function() {
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
      <Subcomponent.Footer />
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
      <Subcomponent.MainHeader
        back={<ManagerHome ID={props.ID} auth={props.auth} />}
        title="Employee Management"
        root={root}
      />
      <div className="buttonContainer" style={{ paddingBottom: "5em" }}>
        <div className="employeeContainer">
          <Subcomponent.DisplayEmployees
            usersList={usersList}
            setAction={setAction}
            setResetAlert={setResetAlert}
            currentUser={props.ID}
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
                className="form-control"
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
                className="form-control"
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
          className="btn btn-success btn-lighter"
          onClick={async function() {
            const res = await db.createUser(firstName, enteredID, employeeType);
            let defaultAvail = {
              employeeID: enteredID,
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
            };
            const res2 = await db.updateWeeklyAvailability(defaultAvail);
            if (typeof res === "string") {
              setAction(Math.random());
            }
          }}
        >
          Add Employee
        </button>
      </div>
      <Subcomponent.Footer />
    </div>
  );
}

function GenerateSchedules(props) {
  const [actions, setAction] = useState(0);

  const [timeOffs, setTimeOffs] = useState([]);
  const [weeklyAvailabilites, setWeeklyAvailabilites] = useState([]);
  const [users, setUsers] = useState([]);
  const [staticSchedules, setStaticSchedules] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [startDateErrorBool, setStartDateErrorBool] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);
  const [submitErrorBool, setSubmitErrorBool] = useState(false);
  const [storeNumber, setStoreNumber] = useState(0);

  const [input, setInput] = useState({
    sunday: [],
    mondayOpen: [],
    mondayClose: [],
    tuesdayOpen: [],
    tuesdayClose: [],
    wednesdayOpen: [],
    wednesdayClose: [],
    thursdayOpen: [],
    thursdayClose: [],
    fridayOpen: [],
    fridayClose: [],
    saturdayOpen: [],
    saturdayClose: [],
  });

  const [result, setResult] = useState({
    sunday: 0,
    mondayOpen: 0,
    mondayClose: 0,
    tuesdayOpen: 0,
    tuesdayClose: 0,
    wednesdayOpen: 0,
    wednesdayClose: 0,
    thursdayOpen: 0,
    thursdayClose: 0,
    fridayOpen: 0,
    fridayClose: 0,
    saturdayOpen: 0,
    saturdayClose: 0,
  });

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
        back={<ManagerHome ID={props.ID} auth={props.auth} />}
        title="Generate Schedule"
        root={root}
      />

      <div className="header" style={{ PaddingTop: "3em" }}>
        <b>Select Store</b>
        <div>
          <input
            type="radio"
            id="8677"
            value="8677"
            name="store"
            onChange={function() {
              setStoreNumber(8677);
            }}
          />
          <label htmlFor="8677">8677</label>
          <br />
          <input
            type="radio"
            id="9200"
            value="9200"
            name="store"
            onChange={function() {
              setStoreNumber(9200);
            }}
          />
          <label htmlFor="9200">9200</label>
        </div>
      </div>

      <div className="header">
        <b>Select Start Date</b>
        <br /> <i>(must be a Sunday)</i>
        <div>
          <input
            type="date"
            onChange={function(e) {
              let date = new Date(e.target.value);
              if (date.getDay() !== 6) {
                setStartDateError("Must be a Sunday!");
                setStartDateErrorBool(true);
              } else {
                setStartDate(date);
                setStartDateError("");
                setStartDateErrorBool(false);
              }
            }}
          />
        </div>
        <div
          className={`${startDateErrorBool ? "alert alert-danger" : ""}`}
          role="alert"
          style={{ width: "20%", margin: "1em auto auto auto" }}
        >
          {startDateError}
        </div>
      </div>

      <div
        className="header"
        style={{ paddingTop: "1em", paddingBottom: "1em" }}
      >
        <button
          className="btn btn-secondary"
          onClick={function() {
            if (startDate.length !== 0 && startDate !== "Must be a Sunday!") {
              setStartDateError("");
              setStartDateErrorBool(false);
              let input = {
                users: users,
                timeOffs: timeOffs,
                weeklyAvailabilites: weeklyAvailabilites,
                staticSchedules: staticSchedules,
                startDate: startDate,
              };
              let res = GenerateSchedule(input);
              setInput(res.days);
              setResult({
                sunday: Helper.SelectRandomEmployee(res.days.sunday),
                mondayOpen: Helper.SelectRandomEmployee(res.days.mondayOpen),
                mondayClose: Helper.SelectRandomEmployee(res.days.mondayClose),
                tuesdayOpen: Helper.SelectRandomEmployee(res.days.tuesdayOpen),
                tuesdayClose: Helper.SelectRandomEmployee(
                  res.days.tuesdayClose
                ),
                wednesdayOpen: Helper.SelectRandomEmployee(
                  res.days.wednesdayOpen
                ),
                wednesdayClose: Helper.SelectRandomEmployee(
                  res.days.wednesdayClose
                ),
                thursdayOpen: Helper.SelectRandomEmployee(
                  res.days.thursdayOpen
                ),
                thursdayClose: Helper.SelectRandomEmployee(
                  res.days.thursdayClose
                ),
                fridayOpen: Helper.SelectRandomEmployee(res.days.fridayOpen),
                fridayClose: Helper.SelectRandomEmployee(res.days.fridayClose),
                saturdayOpen: Helper.SelectRandomEmployee(
                  res.days.saturdayOpen
                ),
                saturdayClose: Helper.SelectRandomEmployee(
                  res.days.saturdayClose
                ),
              });
              setSubmitCheck(true);
            } else {
              setStartDateError("Must select a start date!");
              setStartDateErrorBool(true);
            }
          }}
        >
          Generate
        </button>
      </div>

      <Subcomponent.DisplayGenerateSchedule
        input={input}
        startDate={startDate}
        users={users}
        result={result}
        setResult={setResult}
      />

      <div className="header tall">
        <button
          className="btn btn-success btn-lighter"
          onClick={async function() {
            if (submitCheck) {
              if (storeNumber !== 0) {
                setSubmitError("");
                setSubmitErrorBool(false);
                let input = {
                  startDate: startDate,
                  storeNumber: storeNumber,
                  sunday: result.sunday,
                  mondayOpen: result.mondayOpen,
                  mondayClose: result.mondayClose,
                  tuesdayOpen: result.tuesdayOpen,
                  tuesdayClose: result.tuesdayClose,
                  wednesdayOpen: result.wednesdayOpen,
                  wednesdayClose: result.wednesdayClose,
                  thursdayOpen: result.thursdayOpen,
                  thursdayClose: result.thursdayClose,
                  fridayOpen: result.fridayOpen,
                  fridayClose: result.fridayClose,
                  saturdayOpen: result.saturdayOpen,
                  saturdayClose: result.saturdayClose,
                };
                const res = await db.createSchedule(input);
                console.log(res);
                setResetAlert(true);
              } else {
                setSubmitError("Must select a store number!");
                setSubmitErrorBool(true);
              }
            } else {
              setSubmitError("Must generate schedule!");
              setSubmitErrorBool(true);
            }
          }}
        >
          Submit
        </button>
        <div
          className={`${submitErrorBool ? "alert alert-danger" : ""}`}
          role="alert"
          style={{ width: "20%", margin: "1em auto auto auto" }}
        >
          {submitError}
        </div>
        <div
          className={` ${
            resetAlert ? "alert-shown alert alert-success" : "alert-hidden"
          }`}
          onTransitionEnd={() => setResetAlert(false)}
          style={{
            textAlign: "center",
            width: "20%",
            margin: "1em auto auto auto",
          }}
        >
          Schedule generated!
        </div>
      </div>

      <Subcomponent.Footer />
    </div>
  );
}

function StoreManagement(props) {
  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome ID={props.ID} auth={props.auth} />}
        title="Employee Management"
        root={root}
      />
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
      <Subcomponent.Footer />
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
      setStaticSchedules(res);
    }
    getStaticSchedules();
    // eslint-disable-next-line
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome ID={props.ID} auth={props.auth} />}
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
        style={{ margin: "auto", width: "75%", paddingTop: "10em" }}
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
        <select
          id="users"
          type="dropdown"
          onChange={function(e) {
            setNewSche({ ...newSche, userID_: e.target.value });
          }}
        >
          <Subcomponent.EmployeeList />
        </select>
        <select
          id="stores"
          type="dropdown"
          onChange={function(e) {
            setNewSche({ ...newSche, storeNumber: e.target.value });
          }}
        >
          <option>8677</option>
          <option>9200</option>
        </select>
      </div>
      <div className="header">
        <p style={{ paddingTop: "3em" }}>
          <button
            className="btn btn-success btn-lighter"
            onClick={async function() {
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
      <Subcomponent.Footer />
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
        back={
          props.auth ? (
            <ManagerHome ID={props.ID} auth={props.auth} />
          ) : (
            <EmployeeHome ID={props.ID} auth={props.auth} />
          )
        }
        title="Weekly Availability"
        root={root}
      />
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
                className={`shiftStyle  ${
                  availability.sunday ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.mondayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.mondayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.tuesdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.tuesdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.wednesdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.wednesdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.thursdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.thursdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.fridayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.fridayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.saturdayOpen ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
                  availability.saturdayClose ? "isavail" : "notavail"
                } `}
                onClick={function() {
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
        <p style={{ paddingTop: "3em" }}>
          <button
            onClick={async function() {
              let res = await db.updateWeeklyAvailability(availability);
              setAction(Math.random());
              setResetAlert(true);
            }}
          >
            Update
          </button>
        </p>
        <div
          className={` ${resetAlert ? "alert-shown" : "alert-hidden"}`}
          onTransitionEnd={() => setResetAlert(false)}
          style={{ textAlign: "center" }}
        >
          Availability Updated!
        </div>
      </div>
      <Subcomponent.Footer />
    </div>
  );
}

function TimeOff(props) {
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [timeOffs, setTimeOffs] = useState([]);
  const [actions, setAction] = useState(0);
  const [returnDateError, setReturnDateError] = useState("");
  const [errorBool, setErrorBool] = useState(false);

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
        back={
          props.auth ? (
            <ManagerHome ID={props.ID} auth={props.auth} />
          ) : (
            <EmployeeHome ID={props.ID} auth={props.auth} />
          )
        }
        title="Time Off"
        root={root}
      />
      <div className="header">
        <p style={{ paddingTop: "3em" }}>New Time Off Request</p>
      </div>
      <div className="container" style={{ width: "40%" }}>
        <div className="row text-center">
          <div className="col">
            Leave Date
            <input
              type="date"
              style={{ width: "8em" }}
              onChange={function(e) {
                let date = new Date(e.target.value);
                setLeaveDate(date.toISOString());
              }}
            />
          </div>
          <div className="col">
            Return Date
            <input
              type="date"
              style={{ width: "8em" }}
              onChange={function(e) {
                let date = new Date(e.target.value);
                let start = new Date(leaveDate);
                if (date >= start) {
                  setReturnDate(date.toISOString());
                  setReturnDateError("");
                  setErrorBool(false);
                } else {
                  setReturnDateError(
                    "Return date cannot be before leave date!"
                  );
                  setErrorBool(true);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: "0em", paddingBottom: "2em" }}>
          <div
            className={`${errorBool ? "alert alert-danger" : ""}`}
            role="alert"
            style={{ width: "25%", margin: "1em auto auto auto" }}
          >
            {returnDateError}
          </div>
          <button
            className="btn btn-success btn-lighter"
            onClick={async function() {
              if (returnDateError.length === 0) {
                let res = await db.createTimeOff(
                  props.ID,
                  leaveDate,
                  returnDate
                );
                if (typeof res === "string") {
                  setAction(Math.random());
                }
              }
            }}
          >
            Submit
          </button>
        </p>
      </div>
      <div className="container text-center" style={{ width: "50%" }}>
        <Subcomponent.DisplayTimeOffs
          timeOffs={timeOffs}
          setAction={setAction}
        />
      </div>
      <Subcomponent.Footer />
    </div>
  );
}

function EmployeeOptions(props) {
  const [actions, setAction] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      const user = await db.getUserByID(props.ID);
      setOldPassword(user.password);
    }
    loadData();
  }, [actions]);

  return (
    <div id="mainBox">
      <Subcomponent.MainHeader
        back={<ManagerHome ID={props.ID} auth={props.auth} />}
        title="Employee Options"
        root={root}
      />
      <div className="header tall">Change Password</div>
      <div className="container" style={{ width: "35%" }}>
        <div className="row flex-column">
          <div className="col p-2">
            <div className="row">
              <div className="col text-end">Current Password:</div>
              <div className="col text-start">
                <input
                  type="password"
                  onChange={function(e) {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col p-2">
            <div className="row">
              <div className="col text-end">New Password:</div>
              <div className="col text-start">
                <input
                  type="password"
                  onChange={function(e) {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col p-2">
            <div className="row">
              <div className="col text-end">Confirm New Password:</div>
              <div className="col text-start">
                <input
                  type="password"
                  onChange={function(e) {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col text-center p-2">
            <button
              onClick={async function() {
                if (currentPassword === oldPassword) {
                  if (newPassword === confirmPassword) {
                    setErrorMessage("");
                    const res = await db.changeUserPass(props.ID, newPassword);
                    console.log(res);
                    setSuccessMessage("Password Updated!");
                    setNewPassword("");
                    setCurrentPassword("");
                    setConfirmPassword("");
                    setAction(Math.random());
                  } else setErrorMessage("New password does not match");
                } else
                  setErrorMessage(
                    "Entered password does not match existing password"
                  );
              }}
            >
              Submit
            </button>
            <div style={{ color: "red" }}>{errorMessage}</div>
            <div>{successMessage}</div>
          </div>
        </div>
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
