import {jwtDecode} from "jwt-decode";

const isLogin = () => {
  let accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    return false;
  }
  let decoded = jwtDecode(accessToken);
  return decoded.exp > (new Date() / 1000);
};
export default isLogin;
