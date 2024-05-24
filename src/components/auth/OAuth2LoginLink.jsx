import {Navigate, useNavigate} from "react-router-dom";

export default function OAuth2LoginLink({href, children}) {
  const navigate = useNavigate();
  const checkAuth = (e) => {
    if (sessionStorage.getItem("accessToken")) {
      navigate("/error/403")
      return;
    }
    window.location.href = href;
  }

  return <a style={{textDecoration: "none"}} onClick={checkAuth}>
    {children}
  </a>
}