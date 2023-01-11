import axios from "axios";

const END_POINT = "http://localhost:5000";
const subUrl = {};

export const axios_get = async (url, params) => {
  try {
    const response = axios.get(`${END_POINT}${subUrl[url]}`, { params });
    return response;
  } catch (e) {
    alert(e.message);
  }
};

export const axios_post = async (url, sendData) => {
  try {
    const response = axios.post(`${END_POINT}${subUrl[url]}`, sendData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    alert(e.message);
  }
};

export const axios_put = async (url, sendData) => {};

export const axios_delete = async (url) => {};
