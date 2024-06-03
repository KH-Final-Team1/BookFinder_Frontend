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
          <div className={'menu'}>
            <Link to="/requestBook" className={"menu-name"}>도서 요청</Link>
            <div className="dropdown-content">
              <Link to="/requestBook">도서 요청</Link>
              <Link to="/requestBook/list">요청 도서 목록</Link>
            </div>
          </div>
          <div className={'menu'}>
            <Link to="/trade/list" className={"menu-name"}>지역 게시판</Link>
            <div className="dropdown-content">
              <Link to="/trade/edit">거래 글 작성</Link>
              <Link to="/trade/list">거래 목록 조회</Link>
            </div>
          </div>
          {isLogin() ?
              <div className={'menu'}>
                <Link to="/mypage" className={"menu-name"}>마이페이지</Link>
              </div>
              : <div className={'menu'}>
                <Link to="/login" className={"menu-name"}>로그인</Link>
              </div>}
        </div>
      </div>
  )
}