import cookie from "react-cookies";

// const expires = new Date();
// expires.setMinutes(expires.getMinutes() + 60);

export const setCookie = (name, value) => {
  return cookie.save(name, value, { path: "/", httpOnly: true });
};

export const getCookie = (name) => {
  return cookie.load(name);
};

export const removeCookie = (name, options) => {
  return cookie.remove(name, { ...options });
};
