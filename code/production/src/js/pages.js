import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as Helper from './helpers';
import * as db from './requests';
import * as Subcomponent from './subcomponents';

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
                    root.render(<EmployeeHome />);
                  } else if (result.auth === 1) {
                    root.render(<ManagerHome />);
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
        <p style={{ paddingTop: '1em' }}>
          <u>Home</u>
        </p>
      </div>
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
              <button className="menuBtn">Static Schedules</button>
            </div>
            <div className="col">
              <button className="menuBtn">Generate Schedule</button>
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
              <button className="menuBtn">Time Off</button>
            </div>
            <div className="col">
              <button
                className="menuBtn"
                onClick={function () {
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
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: '1em' }}>
          <u>Home</u>
        </p>
      </div>

      <div className="header">
        <p style={{ paddingTop: '3em' }}>Employee Options</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">
              <button className="menuBtn" id="timeoffbtn">
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
  return (
    <div id="mainBox">
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: '1em' }}>
          <u>Employee Management</u>
        </p>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>
          <button>Add Employee</button>
        </p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row">
            <div className="col">John Doe</div>
            <div className="col">
              <select name="authLevel" id="">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="col">
              <button style={{ width: '10em' }}>Edit Employee</button>
            </div>
            <div className="col">
              <button style={{ width: '10em' }}>Reset Password</button>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{ paddingTop: '3em' }}>
          <button>Confirm</button>
        </p>
      </div>
    </div>
  );
}

function StoreManagement(props) {
  return (
    <div id="mainBox">
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: '1em' }}>
          <u>Store Management</u>
        </p>
      </div>
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

function WeeklyAvailablity(props) {
  return (
    <div id="mainBox">
      <div className="header" id="main header">
        GNC Wilmington
        <p style={{ paddingTop: '1em' }}>
          <u>Weekly Availablity</u>
        </p>
      </div>
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
                id="sunday"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('sunday');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('mondayopen');
                }}
              >
                Open
              </div>
              <div
                id="mondayclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('mondayclose');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('tuesopen');
                }}
              >
                Open
              </div>
              <div
                id="tuesclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('tuesclose');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('wedopen');
                }}
              >
                Open
              </div>
              <div
                id="wedclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('wedclose');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('thuopen');
                }}
              >
                Open
              </div>
              <div
                id="thuclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('thuclose');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('friopen');
                }}
              >
                Open
              </div>
              <div
                id="friclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('friclose');
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
                onClick={function () {
                  Helper.AvailabiltyToggle('satopen');
                }}
              >
                Open
              </div>
              <div
                id="satclose"
                className="shiftStyle notavail"
                onClick={function () {
                  Helper.AvailabiltyToggle('satclose');
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
          <button>Confirm</button>
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
