import axios from "axios";

const END_POINT = "http://10.188.191.201:8088";
const subUrl = {
  todo: "/api/main/todo",
};

export const axios_get = async (url, params) => {
  try {
    const response = await axios.get(`${END_POINT}${subUrl[url]}`, {
      params,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("API 에러");
    }
  } catch (e) {
    alert(e.message);
  }
};

export const axios_post = async (url, sendData) => {
  try {
    const response = await axios.post(`${END_POINT}${subUrl[url]}`, sendData, {
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
