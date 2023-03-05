import axios from "axios";
import { getCookie } from "../service/Cookie";

const END_POINT = "http://49.50.163.197:8080";
// const END_POINT = "http://10.188.191.201:8088";
const subUrl = {
  login: "/api/login",
  register: "/api/signup",
  todo: "/api/member/todo",
  success: "/api/member/todo/success",
  info: "/api/user/info",
  calendar: "/api/member/calender",
};
const contentType = {
  json: "application/json",
  form: "multipart/form-data",
};

const token = getCookie("access_token");

export const axios_get = async (url, params) => {
  // TODO 로그인 후에 데이터를 잘 못불러오는 버그가 있음
  axios.defaults.headers.get["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(`${END_POINT}${subUrl[url]}`, {
      params,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("API 에러");
    }
  } catch (e) {
    console.error("GET Error : ", e);
    return e.response.data;
  }
};

export const axios_post = async (url, sendData, type = "json", auth) => {
  const headers = auth
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": contentType[type],
      }
    : {
        "Content-Type": contentType[type],
      };
  try {
    const response = await axios.post(`${END_POINT}${subUrl[url]}`, sendData, {
      headers,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("API 에러");
    }
  } catch (e) {
    console.error("POST Error : ", e);
    return e.response.data;
  }
};

export const axios_put = async (url, params, sendData = null) => {
  axios.defaults.headers.put["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.put(`${END_POINT}${subUrl[url]}`, sendData, {
      params,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("API 에러");
    }
  } catch (e) {
    console.error("PUT Error : ", e);
    return null;
  }
};

export const axios_delete = async (url, params) => {
  axios.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.delete(`${END_POINT}${subUrl[url]}`, {
      params,
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error("API 에러");
    }
  } catch (e) {
    console.error("Delete Error : ", e);
    return null;
  }
};
