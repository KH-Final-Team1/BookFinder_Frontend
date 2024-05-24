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