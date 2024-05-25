import {useEffect} from "react";
import {requestAccessTokenForOAuth2Login} from "../../services/auth/authAPI";
import {Navigate, useNavigate} from "react-router-dom";

export default function OAuth2Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const awaitToken = async () => {
      try {
        let result = await requestAccessTokenForOAuth2Login();
        sessionStorage.setItem("accessToken", result.data.accessToken);
        window.location.href = "/"
      } catch (error) {
        console.log(error)
      }
    }
    awaitToken()
  }, []);
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/error/403" replace/>
  }

  return <div>로그인 중입니다 잠시만 기다려주세요.</div>
}