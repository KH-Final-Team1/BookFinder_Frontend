import {Link, Navigate} from "react-router-dom";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Button";
import OAuth2LoginLink from "../../components/auth/OAuth2LoginLink";

export default function Login() {
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/error/403" replace/>
  }
  return (<section className="sign-up-main">
    <Title>간편하게 로그인 하세요.</Title>
    <div>
      회원이 되어 회원 간 대출 서비스를 이용해 보세요.
    </div>
    <div className="login-buttons-section">
      <div>
        <OAuth2LoginLink href="http://localhost:8080/oauth2/authorization/kakao">
          <Button className="kakao-login-button">
            <span className="login-svg">
              <svg viewBox="0 0 21 20" width="21" height="20" fill="none" className="login-svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M10.5 2.62891C6.16282 2.62891 2.64282 5.36319 2.64282 8.72605C2.64282 10.8239 4.00211 12.6546 6.07639 13.7703L5.20425 16.9682C5.1878 17.0318 5.19118 17.0989 5.21396 17.1605C5.23673 17.2222 5.27781 17.2754 5.33167 17.313C5.38554 17.3506 5.44962 17.3709 5.51532 17.371C5.58102 17.3712 5.6452 17.3513 5.69925 17.3139L9.51782 14.776C9.83997 14.776 10.17 14.8311 10.5 14.8311C14.8371 14.8311 18.3571 12.0968 18.3571 8.72605C18.3571 5.35534 14.8371 2.62891 10.5 2.62891Z"
                      fill="#181600">
                </path>
              </svg>
            </span>
            <p className="kakao-login-button-text">카카오 계정으로 계속하기</p>
          </Button>
        </OAuth2LoginLink>
      </div>
      <div>
        <OAuth2LoginLink href="http://localhost:8080/oauth2/authorization/google">
          <Button className="google-login-button">
            <span className="login-svg">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" className="login-svg">
                <g id="Group">
                  <path id="Vector" fillRule="evenodd" clipRule="evenodd"
                        d="M15.4057 8.17566C15.4057 7.6288 15.3569 7.10251 15.2651 6.59766H8V9.58137H12.152C11.9729 10.5457 11.4294 11.3634 10.6126 11.9102V13.8457H13.1051C14.564 12.5025 15.4057 10.5251 15.4057 8.17566Z"
                        fill="#3D82F0">

                  </path>
                  <path id="Vector_2" fillRule="evenodd" clipRule="evenodd"
                        d="M8.0002 15.7146C10.0831 15.7146 11.8291 15.0238 13.1053 13.8461L10.6128 11.9098C9.92192 12.3726 9.0382 12.6461 8.0002 12.6461C5.99106 12.6461 4.29049 11.2892 3.68363 9.46606H1.1062V11.4649C2.37563 13.9858 4.98477 15.7146 8.0002 15.7146Z"
                        fill="#31A752">
                  </path>
                  <path id="Vector_3" fillRule="evenodd" clipRule="evenodd"
                        d="M3.68348 9.46593C3.5292 9.00307 3.44177 8.5085 3.44177 8.00022C3.44177 7.49193 3.5292 6.99736 3.68348 6.5345V4.53564H1.10605C0.584052 5.57707 0.285767 6.75564 0.285767 8.00022C0.285767 9.24479 0.584052 10.4234 1.10605 11.4648L3.68348 9.46593Z"
                        fill="#F9BA00">
                  </path>
                  <path id="Vector_4" fillRule="evenodd" clipRule="evenodd"
                        d="M8.0002 3.35422C9.13249 3.35422 10.1499 3.74336 10.9488 4.50793L13.1619 2.29564C11.8256 1.05022 10.0796 0.285645 8.0002 0.285645C4.98477 0.285645 2.37563 2.0145 1.1062 4.53622L3.68363 6.53422C4.29049 4.71107 5.99106 3.35422 8.0002 3.35422Z"
                        fill="#E64234">
                  </path>
                </g>
              </svg>
            </span>
            <p className="login-button-text">구글 계정으로 계속하기</p>
          </Button>
        </OAuth2LoginLink>
      </div>
      <div className="field">
        <Link to="/login/email" style={{textDecoration: "none"}}>
          <Button className="email-login-button">
            <p className="login-button-text">이메일로 계속하기</p>
          </Button>
        </Link>
      </div>
    </div>
  </section>);
}