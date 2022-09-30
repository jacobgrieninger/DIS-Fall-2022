import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById("stage"));

function Init() {
  root.render(<LoginPage />)
}

function LoginPage(props) {
  return (
    <div id="mainBoxLogin">
    <div className="header">
        GNC Wilmington
    </div>
    <div id="loginBox">
        <div>
            <div className="row">
                <div className="col" style={{textAlign: "left"}}>Username:</div>
                <div className="col"><input type="text" spellCheck="false" /></div>
            </div>
            <br />
            <div className="row">
                <div className="col" style={{textAlign: "left"}}>Password:</div>
                <div className="col"><input type="text" /></div>
            </div>
            <br />
            <div style={{margin: "auto", textAlign: "center"}}><button id="loginBtn"  onClick={function(){
                alert("Database validation has not been setup yet. Use one of the two buttons below to simulate a login as an Manager / Employee");}}>Login</button></div>
            <br />
            <div style={{margin: "auto", textAlign: "center"}}>
            <button id="loginBtnManager" onClick={function(){
                root.render(<ManagerHome />);
            }}>Login as Manager</button>
            <button id="loginBtnEmployee" onClick={function(){
                root.render(<EmployeeHome />);
            }}>Login as Employee</button>
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
            <p style={{paddingTop: "1em"}}><u>Home</u></p>
            </div>
            <div className="header">
            <p style={{paddingTop: "5em"}}>Manager Options</p>
            </div>
            <div className="buttonContainer">
                <div>
                    <div className="row">
                        <div className="col"><button className="menuBtn"  onClick={function(){
                        root.render(<EmployeeManagement />);
                    }}>Employee Management</button></div>
                        <div className="col"><button className="menuBtn"  onClick={function(){
                        root.render(<StoreManagement />);
                        }}>Store Management</button></div>
                    </div>
                <br />
                    <div className="row">
                        <div className="col"><button className="menuBtn">Static Schedules</button></div>
                        <div className="col"><button className="menuBtn">Generate Schedule</button></div>
                    </div>
                </div>
            </div>
            <div className="header">
            <p style={{paddingTop: "3em"}}>Employee Options</p>
            </div>
        <div className="buttonContainer">
            <div>
                <div className="row">
                    <div className="col"><button className="menuBtn">Time Off</button></div>
                    <div className="col"><button className="menuBtn" onClick={function(){
                      root.render(<WeeklyAvailablity />)
                    }}>Weekly Availabilty</button></div>
                </div>
            </div>
        </div>
            <div className="header">
            <p style={{paddingTop: "5em"}}><i>Insert calender views of each store for current week below...</i></p>
            </div>
        </div>     
    );
}

function EmployeeHome(props) {
    return (
        <div id="mainBox">
        <div className="header" id="main header">
            GNC Wilmington
            <p style={{paddingTop: "1em"}}><u>Home</u></p>
        </div>
        <div className="header">
          <p style={{paddingTop: "3em"}}>Employee Options</p>
        </div>
        <div className="buttonContainer">
          <div>
            <div className="row">
              <div className="col"><button className="menuBtn" id="timeoffbtn">Time Off</button></div>
              <div className="col"><button className="menuBtn">Weekly Availabilty</button></div>
            </div>
          </div>
        </div>
        <div className="header">
          <p style={{paddingTop: "5em"}}><i>Insert calender views of each store for current week below...</i></p>
        </div>
        <div className="calenderViews">
          <div className="calender">
            <b>8677</b>
            <div className="row gx-0">
              <div className="col dayBox">
                <u>Sunday</u><br />
                9/27/22
                <div className="shiftContainer">
                  <div className="employeeDisplay bdr">John</div>
                  <div className="employeeDisplay">Bill</div>
                </div>
              </div>
              <div className="col dayBox">
                <u>Monday</u>
              </div>
              <div className="col dayBox">
                <u>Tuesday</u>
              </div>
              <div className="col dayBox">
                <u>Wednesday</u>
              </div>
              <div className="col dayBox">
                <u>Thursday</u>
              </div>
              <div className="col dayBox">
                <u>Friday</u>
              </div>
              <div className="col dayBox">
                <u>Saturday</u>
              </div>
            </div>
          </div>
          <div className="calender">
            duplicate of calendar on left 
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
            <p style={{paddingTop: "1em"}}><u>Employee Management</u></p>
        </div>
        <div className="header">
          <p style={{paddingTop: "3em"}}><button>Add Employee</button></p>
        </div>
        <div className="buttonContainer">
          <div>
            <div className="row">
              <div className="col">John Doe</div>
              <div className="col"><select name="authLevel" id=""><option value="Employee">Employee</option><option value="Manager">Manager</option></select></div>
              <div className="col"><button style={{width: "10em"}}>Edit Employee</button></div>
              <div className="col"><button style={{width: "10em"}}>Reset Password</button></div>
            </div>
          </div>
        </div>
        <div className="header">
          <p style={{paddingTop: "3em"}}><button>Confirm</button></p>
        </div>
      </div>
    );
}

function StoreManagement(props) {
    return (
      <div id="mainBox">
      <div className="header" id="main header">
          GNC Wilmington
          <p style={{paddingTop: "1em"}}><u>Store Management</u></p>
      </div>
      <div className="header">
        <p style={{paddingTop: "3em"}}>8677</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{paddingBottom: "1em"}}>
            <div className="col" style={{width: "20em"}}>Sunday Hours</div>
            <div className="col colmesh">Open</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
            <div className="col colmesh">Close</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
          </div>
          <div className="row">
            <div className="col" style={{width: "20em"}}>M-Sat Hours</div>
            <div className="col colmesh">Open</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
            <div className="col colmesh">Close</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{paddingTop: "3em"}}>9200</p>
      </div>
      <div className="buttonContainer">
        <div>
          <div className="row" style={{paddingBottom: "1em"}}>
            <div className="col" style={{width: "20em"}}>Sunday Hours</div>
            <div className="col colmesh">Open</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
            <div className="col colmesh">Close</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
          </div>
          <div className="row">
            <div className="col" style={{width: "20em"}}>M-Sat Hours</div>
            <div className="col colmesh">Open</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
            <div className="col colmesh">Close</div>
            <div className="col"><input type="text" style={{width: "5em"}} /></div>
          </div>
        </div>
      </div>
      <div className="header">
        <p style={{paddingTop: "5em"}}><button>Save</button></p>
      </div>
    </div>
    );
}

function WeeklyAvailablity(props) {
  return (
    <div id="mainBox">
      <div className="header" id="main header">
      GNC Wilmington
      <p style={{paddingTop: "1em"}}><u>Weekly Availablity</u></p>
      </div>
      <div className="header">
      <p style={{paddingTop: "3em"}}>Sample Week</p>
      </div>
      <div className="calender" style={{margin: "auto", width: "75%"}}>
        <div className="row gx-0">
          <div className="col dayBox">
            <div className="calendarHeader2"><u>Sunday</u><br /></div>
            <div className="availContainer">
              <div>X</div>
              <div>X</div>
            </div>
          </div>
          <div className="col dayBox">
          <u>Monday</u>
          </div>
          <div className="col dayBox">
          <u>Tuesday</u>
          </div>
          <div className="col dayBox">
          <u>Wednesday</u>
          </div>
          <div className="col dayBox">
          <u>Thursday</u>
          </div>
          <div className="col dayBox">
          <u>Friday</u>
          </div>
          <div className="col dayBox">
          <u>Saturday</u>
          </div>
        </div>
      </div>
        <div className="header">
        <p style={{paddingTop: "3em"}}><button>Confirm</button></p>
        </div>
    </div>
  );
}

export {Init, LoginPage, ManagerHome, EmployeeHome, EmployeeManagement, StoreManagement};
