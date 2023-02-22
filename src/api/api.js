import axios from "axios";

const END_POINT = "http://175.45.204.72:8080";
const subUrl = {
  login: "/api/login",
  register: "api/register",
  todo: "/api/main/todo",
  info: "/api/user/info",
};
const contentType = {
  json: "application/json",
  form: "multipart/form-data",
};

export const axios_get = async (url, params, token) => {
  try {
    const response = await axios.get(`${END_POINT}${subUrl[url]}`, {
      headers: {
        Authorization: token,
      },
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

export const axios_post = async (url, sendData, type) => {
  try {
    const response = await axios.post(`${END_POINT}${subUrl[url]}`, sendData, {
      headers: {
        "Content-Type": contentType[type],
      },
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

export const axios_put = async (url, sendData) => {};

export const axios_delete = async (url) => {};
