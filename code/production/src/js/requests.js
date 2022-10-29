import axios from "axios";

const login = async (userID_, password_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
      password: password_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/auth",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getScheduleByDate = async (startdate_) => {
  try {
    let data = JSON.stringify({
      date: startdate_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/schedule/bydate",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async () => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:5000/api/users/all",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createTimeOff = async (userID_, leaveDate_, returnDate_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
      leaveDate: leaveDate_,
      returnDate: returnDate_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/timeoff",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getTimeOffs = async (userID_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/timeoff/getallbyid",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllTimeOffs = async () => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:5000/api/timeoff/getall",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const delteTimeOff = async (id_) => {
  try {
    let data = JSON.stringify({
      _id: id_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/timeoff/delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (name_, userID_, authlevel_) => {
  try {
    let data = JSON.stringify({
      name: name_,
      userID: userID_,
      password: "default",
      authlevel: authlevel_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/users",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (userID_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/users/delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const resetUserPass = async (userID_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/users/resetpass",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllStaticSchedules = async () => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:5000/api/staticSchedule/all",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteStaticSchedule = async (id_) => {
  try {
    let data = JSON.stringify({
      _id: id_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/staticSchedule/delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createStaticSchedule = async (newSche_) => {
  try {
    let data = JSON.stringify({
      userID: newSche_.userID_,
      sunday: newSche_.sunday,
      mondayOpen: newSche_.mondayOpen,
      mondayClose: newSche_.mondayClose,
      tuesdayOpen: newSche_.tuesdayOpen,
      tuesdayClose: newSche_.tuesdayClose,
      wednesdayOpen: newSche_.wednesdayOpen,
      wednesdayClose: newSche_.wednesdayClose,
      thursdayOpen: newSche_.thursdayOpen,
      thursdayClose: newSche_.thursdayClose,
      fridayOpen: newSche_.fridayOpen,
      fridayClose: newSche_.fridayClose,
      saturdayOpen: newSche_.saturdayOpen,
      saturdayClose: newSche_.saturdayClose,
      storeNumber: newSche_.storeNumber,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/staticSchedule/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getWeeklyAvailability = async (userID_) => {
  try {
    let data = JSON.stringify({
      employeeID: userID_,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/availability/get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getAllWeeklyAvailability = async () => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:5000/api/availability/getall",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const updateWeeklyAvailability = async (availability_) => {
  try {
    let data = JSON.stringify({
      employeeID: availability_.employeeID,
      sunday: availability_.sunday,
      mondayOpen: availability_.mondayOpen,
      mondayClose: availability_.mondayClose,
      tuesdayOpen: availability_.tuesdayOpen,
      tuesdayClose: availability_.tuesdayClose,
      wednesdayOpen: availability_.wednesdayOpen,
      wednesdayClose: availability_.wednesdayClose,
      thursdayOpen: availability_.thursdayOpen,
      thursdayClose: availability_.thursdayClose,
      fridayOpen: availability_.fridayOpen,
      fridayClose: availability_.fridayClose,
      saturdayOpen: availability_.saturdayOpen,
      saturdayClose: availability_.saturdayClose,
    });
    let config = {
      method: "post",
      url: "http://localhost:5000/api/availability/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export {
  login,
  getScheduleByDate,
  getAllUsers,
  createTimeOff,
  getTimeOffs,
  getAllTimeOffs,
  delteTimeOff,
  createUser,
  deleteUser,
  resetUserPass,
  getAllStaticSchedules,
  deleteStaticSchedule,
  createStaticSchedule,
  getWeeklyAvailability,
  getAllWeeklyAvailability,
  updateWeeklyAvailability,
};
