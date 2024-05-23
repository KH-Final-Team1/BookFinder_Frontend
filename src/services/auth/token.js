import {jwtDecode} from "jwt-decode";

const token = sessionStorage.getItem("accessToken");
const claims = jwtDecode(token);

export const getBoroughId = () => {
  return claims.boroughId;
}