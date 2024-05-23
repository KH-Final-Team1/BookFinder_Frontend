import {useEffect} from "react";
import {requestAccessTokenForOAuth2Login, requestOauthSignUp} from "../../services/auth/authAPI";
import {useNavigate} from "react-router-dom";

export default function OAuth2Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const awaitToken = async () => {
      try {
        let result =await requestAccessTokenForOAuth2Login();
        sessionStorage.setItem("accessToken", result.data.accessToken);
        navigate("/")
      } catch (error) {
        console.log(error)
      }
    }
    awaitToken()
  }, []);

  return <div>로그인 중입니다 잠시만 기다려주세요.</div>
}