import Back from "../../components/auth/Back";
import Title from "../../components/ui/Title";
import SignUpForm from "../../components/auth/SignUpForm";
import {Navigate} from "react-router-dom";

export default function SignUp() {
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/error/403" replace/>
  }
  return (
      <section className="auth-main">
        <Back/>
        <Title>회원가입</Title>
        <SignUpForm/>
      </section>
  )
}
