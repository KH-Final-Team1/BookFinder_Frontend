import {Link} from "react-router-dom";
import isLogin from "../../utils/isLogin";

export default function Header() {
  return (
      <div className={"header"}>
        <div className={'logo'}>
          <Link to="/">
            <img src={'/logo.png'} alt="logo"/>
          </Link>
        </div>
        <div className={"menu-bar"}>
          <div>
            <Link to="/requestBook" className={"menu"}>도서 요청</Link>
          </div>
          <div>
            <Link to="/trade/list" className={"menu"}>지역 게시판</Link>
          </div>
          <div>
            <Link to="" className={"menu"}>메뉴명3</Link>
          </div>
          {isLogin() ?
              <div>
                <Link to="/mypage" className={"menu"}>마이페이지</Link>
              </div>
              : <div>
                <Link to="/login" className={"menu"}>로그인</Link>
              </div>}
          <div></div>
        </div>
      </div>
  )
}