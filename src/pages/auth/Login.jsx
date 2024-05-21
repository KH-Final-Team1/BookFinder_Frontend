import {Link} from "react-router-dom";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";

export default function Login() {
  return (<section className="sign-up-main">
    <Title>간편하게 로그인 하세요.</Title>
    <div>
      <Link to="">
        <Button className="auth-button">카카오 계정으로 계속하기</Button>
      </Link>
    </div>
    <div>
      <Link to="">
        <Button className="auth-button">구글 계정으로 계속하기</Button>
      </Link>
    </div>
    <div>
      <Link to="/login/email">
        <Button className="auth-button">이메일로 계속하기</Button>
      </Link>
    </div>
  </section>);
}