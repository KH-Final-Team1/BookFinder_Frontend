import {Link} from "react-router-dom";

export default function Header(){
  return(
      <div className={"header"}>
        <div className={'logo'}>
          프로그램 로고
        </div>
        <div className={"menu-bar"}>
          <div>
            <Link to="/requestBook" className={"menu"}>도서 요청</Link>
          </div>
          <div>
            <Link to="" className={"menu"}>메뉴명2</Link>
          </div>
          <div>
            <Link to="" className={"menu"}>메뉴명3</Link>
          </div>
          <div>
            <Link to="" className={"menu"}>로그인</Link>
          </div>
          <div>
            <Link to="" className={"menu"}>마이페이지</Link>
          </div>
          <div></div>
        </div>
      </div>
  )
}