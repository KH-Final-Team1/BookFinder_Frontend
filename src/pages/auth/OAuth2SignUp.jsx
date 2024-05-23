import Back from "../../components/auth/Back";
import Title from "../../components/ui/Title";
import OAuth2SignUpForm from "../../components/auth/OAuth2SignUpForm";

export default function OAuth2SignUp() {
  return (
      <section className="sign-up-main">
        <Back/>
        <Title>추가 정보 입력</Title>
        <OAuth2SignUpForm/>
      </section>
  )
}