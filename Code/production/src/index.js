import ManagerHome from "./js/managerhome";
import EmployeeHome from "./js/home";
import ReactDOM from 'react-dom/client';


document.getElementById("loginBtn").onclick = function(){
    alert("Database validation has not been setup yet. Use one of the two buttons below to simulate a login as an Manager / Employee")
};


document.getElementById("loginBtnManager").onclick = function(){
    ManagerHome();
    const root = ReactDOM.createRoot(document.getElementById("stage"));
    root.render(<ManagerHome />);
};

document.getElementById("loginBtnEmployee").onclick = function(){
    EmployeeHome();
    const root = ReactDOM.createRoot(document.getElementById("stage"));
    root.render(<EmployeeHome />);
};
