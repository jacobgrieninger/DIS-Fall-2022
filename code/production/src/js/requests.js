import axios from 'axios';

const url = 'http://localhost:5000/';

const login = async (userID_, password_) => {
  try {
    let data = JSON.stringify({
      userID: userID_,
      password: password_,
    });
    // prettier-ignore
    let config = {
      method: 'post',
      url: 'http://localhost:5000/api/auth',
      headers: {
        'Accept': 'application/json',
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

export { login };
