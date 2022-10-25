import axios from 'axios';

const login = async (userID_, password_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
      password: password_,
    });
    let config = {
      method: 'post',
      url: 'http://localhost:5000/api/auth',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/schedule/bydate',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/users/all',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/timeoff',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/timeoff/getall',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: data,
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
      method: 'post',
      url: 'http://localhost:5000/api/timeoff/delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      password: 'default',
      authlevel: authlevel_,
    });
    let config = {
      method: 'post',
      url: 'http://localhost:5000/api/users',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/users/delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
      method: 'post',
      url: 'http://localhost:5000/api/users/resetpass',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
  delteTimeOff,
  createUser,
  deleteUser,
  resetUserPass,
};
