import React from 'react';


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

export default EmployeeManagement;