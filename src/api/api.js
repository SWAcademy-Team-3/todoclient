import axios from "axios";
import { getCookie } from "../service/Cookie";

const END_POINT = "https://www.cheerdo.o-r.kr";
// const END_POINT = "http://10.188.191.201:8088";
const subUrl = {
  login: "/api/login",
  register: "/api/signup",
  todo: "/api/member/todo",
  habit: "/api/member/habit",
  success: "/api/member/todo/success",
  myInfo: "/api/member/my-info",
  info: "/api/member/info",
  calendar: "/api/member/calender",
  friendInfo: "/api/member/friend-info",
  friend_request: "/api/member/friend/requests",
  friend_request_control: "/api/member/friend/requests/control",
  post_request: "/api/member/friend/post-requests",
  letter: "/api/member/post/letter",
  post: "/api/member/post/posts",
};
const contentType = {
  json: "application/json",
  form: "multipart/form-data",
};

export const axios_get = async (url, params) => {
  const token = getCookie("access_token");
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
  const token = getCookie("access_token");
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

const token = getCookie("access_token");
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
  const token = getCookie("access_token");
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
