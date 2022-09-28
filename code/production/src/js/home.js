import React from 'react';


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

export default EmployeeHome;