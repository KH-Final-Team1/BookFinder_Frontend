import React, {useEffect, useState} from "react";
import {requestMyInfo} from "../../services/auth/authAPI";
import Title from "../../components/ui/Title";
import {Link} from "react-router-dom";
import Button from "../../components/ui/Button";

export default function MyPage() {
  const [myInfo, setMyInfo] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let response = await requestMyInfo();
        return response.data;
      } catch (error) {
        console.log(error);
        alert("내 정보 가져오기 실패했습니다.")
      }
    }
    getUserInfo()
    .then(data => {
      setMyInfo({
            id: data.id,
            role: data.role,
            email: data.email,
            nickname: data.nickname,
            borough: data.borough,
            phone: data.phone,
            bookTrades: data.bookTrades,
            createDate: data.createDate,
          }
      )
      console.log(data)
    });
  }, []);
  const logOut = () => {
    sessionStorage.removeItem("accessToken");
    window.location.href = "/";
  }

  return <section className="auth-main">
    <Title> 마이 페이지</Title>
    <hr/>
    {myInfo &&
    <div className="my-info-grid">
      <div className="my-info-container">
        <img className="my-info-avatar"
             src="https://cdn-icons-png.flaticon.com/512/44/44463.png"
             alt="Writer Icon"/>
        <div className="my-info-text">
          <div>회원번호: {myInfo.id}</div>
          <div>{myInfo.nickname}</div>
          <div>{myInfo.role === "ROLE_ADMIN" ? "관리자" : "일반 회원"} | {myInfo.borough}</div>
          <div>{myInfo.email} </div>
          <div>{myInfo.phone}</div>
          <div>가입날짜: {myInfo.createDate}</div>
          <div>
            <button className="auth-button" onClick={logOut}
                    style={{width: "80px", height: "35px", fontSize: "18px"}}>로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
    }
    <hr/>
    <Title>작성 글 목록</Title>
    <div className="book-trades">
      {myInfo.bookTrades &&
      (<table>
        <tbody>
        {myInfo.bookTrades.map(trade => {
          const tradeType = trade.tradeType === 'BORROW' ? "빌려요" : "빌려드려요"
          const tradeTypeColor = trade.tradeType === 'BORROW' ? "red"
              : "blue";
          const tradeYn = trade.tradeYn === 'Y' ? "거래완료" : "거래중"

          return (
              <Link to={`/trade/${trade.id}`} className="link">
                <tr key={trade.id}>
                  <td className="book-img-border">
                    <img src={trade.book.imageUrl} alt={trade.book.name}/>
                  </td>
                  <td className="trade-info">
                    <p className="trade-type"
                       style={{color: tradeTypeColor}}>{tradeType}</p>
                    <p className="book-title">{trade.book.name}</p>
                    <p className="book-info">{trade.book.authors} / {trade.book.publicationYear}</p>
                    <p className="writer-info">
                      <img
                          src="https://cdn-icons-png.flaticon.com/512/44/44463.png"
                          alt="Writer Icon"/>
                      {trade.user ? trade.user.nickname : "Unknown"}
                    </p>
                    <p className="trade-price">
                      <img
                          src="https://cdn-icons-png.flaticon.com/512/5633/5633965.png"
                          alt="Price Icon"/>
                      {trade.rentalCost.toLocaleString()} 원
                    </p>
                    <div>
                      <p className='trade-yn'>{tradeYn}</p>
                      <p className="create-date">{trade.createDate}</p>
                    </div>
                  </td>
                </tr>
              </Link>
          );
        })}
        </tbody>
      </table>)
      }
    </div>
  </section>
}