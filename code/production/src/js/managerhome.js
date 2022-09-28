import React from 'react';
import EmployeeManagement from "./employeemanagement";
import StoreManagement from "./storemanagement";
import ReactDOM from 'react-dom/client';

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
                        EmployeeManagement();
                        let root = ReactDOM.createRoot(document.getElementById("stage"));
                        root.render(<EmployeeManagement />);
                    }}>Employee Management</button></div>
                        <div className="col"><button className="menuBtn"  onClick={function(){
                        StoreManagement();
                        let root = ReactDOM.createRoot(document.getElementById("stage"));
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
                    <div className="col"><button className="menuBtn">Weekly Availabilty</button></div>
                </div>
            </div>
        </div>
            <div className="header">
            <p style={{paddingTop: "5em"}}><i>Insert calender views of each store for current week below...</i></p>
            </div>
        </div>     
    );
}

export default ManagerHome;