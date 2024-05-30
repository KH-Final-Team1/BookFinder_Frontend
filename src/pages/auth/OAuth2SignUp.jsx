import Back from "../../components/auth/Back";
import Title from "../../components/ui/Title";
import OAuth2SignUpForm from "../../components/auth/OAuth2SignUpForm";
import {Navigate} from "react-router-dom";

export default function OAuth2SignUp() {
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/error/403" replace/>
  }
  return (
      <section className="auth-main">
        <Back/>
        <Title>추가 정보 입력</Title>
        <OAuth2SignUpForm/>
      </section>
  )
}