import axios from "axios";

const url = "http://localhost:5000/";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const login = async (userID, password) => {
  try {
    const body = JSON.stringify({
      userID: userID,
      password: password,
    });
    const res = await axios.post(`${url}api/auth`, body, config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export { login };
