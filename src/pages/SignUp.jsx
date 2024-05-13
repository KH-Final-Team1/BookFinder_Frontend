import Back from "../components/signup/Back";
import Title from "../components/ui/Title";
import SignUpForm from "../components/signup/SignUpForm";

export default function SignUp() {
  return (
      <section className="main">
        <Back/>
        <Title>회원가입</Title>
        <SignUpForm/>
      </section>
  )
}
