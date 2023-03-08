import { getCookie } from "./Cookie";

const CheckLogin = () => {
  const access_token = getCookie("a_token");
};

export default CheckLogin;
