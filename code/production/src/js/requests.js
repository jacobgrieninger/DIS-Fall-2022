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

export { login, getScheduleByDate, getAllUsers };
