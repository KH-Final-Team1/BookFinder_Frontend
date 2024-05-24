import {jwtDecode} from "jwt-decode";

const token = sessionStorage.getItem("accessToken");
const claims = token ? jwtDecode(token) : {};

export const getBoroughId = () => {
  return claims.boroughId;
}

export const getUserRole = () => {
  return claims.auth;
}