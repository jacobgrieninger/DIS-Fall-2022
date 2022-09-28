import React from 'react';


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

export default StoreManagement;