import {jwtDecode} from "jwt-decode";

export const getBoroughId = () => {
  const token = sessionStorage.getItem("accessToken");
  const claims = jwtDecode(token);
  return claims.boroughId;
}

export const getBoroughName = () => {
  const token = sessionStorage.getItem("accessToken");
  const claims = jwtDecode(token);
  return claims.boroughName;
}

export const getUserId = () => {
  const token = sessionStorage.getItem("accessToken");
  const claims = jwtDecode(token);
  return claims.id;
}

export const getUserRole = () => {
  const token = sessionStorage.getItem("accessToken");
  const claims = jwtDecode(token);
  return claims.auth;
}