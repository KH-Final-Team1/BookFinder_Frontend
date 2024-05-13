import {Link} from "react-router-dom";

export default function Login() {
  return (<div>
    로그인 페이지
    <div>
      <Link to="/sign-up">회원 가입</Link>
    </div>
    <div>
      카카오 계정으로 계속하기
    </div>
    <div>
      구글 계정으로 계속하기
    </div>
  </div>);
}