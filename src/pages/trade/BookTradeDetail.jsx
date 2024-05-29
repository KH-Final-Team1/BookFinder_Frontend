import React, {useEffect, useRef, useState} from "react";
import Button from "../../components/ui/Button";
import { useParams, useNavigate } from 'react-router-dom';
import {
  changeTradeType,
  deleteTrade,
  getTrade
} from "../../services/trade/tradeAPI";
import {viewMap} from "../../services/kakao/kakaoMap";
import CommentList from "./CommentList";
import {getUserId} from "../../services/auth/token";

export default function TradeDetails() {
  const loginUserId = getUserId();
  const { tradeId } = useParams();
  const [trade, setTrade] = useState(null);
  const [addressInfo, setAddressInfo] = useState('');
  const mapRef = useRef(null); // Ref to store the map instance
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/trade/edit/${tradeId}`);
  };

  useEffect(()=>{
    const fetchData = async () => {
      const result = await getTrade(tradeId);
      setTrade(result);
    }
    fetchData();
  }, [tradeId]);

  const deleteTradeClick = async () => {
    const result = await deleteTrade(tradeId);
    if (result) {
      navigate('/trade/list');
    }
  };

  const handleChangeTradeType = async (event) => {
    const tradeYn = event.target.checked ? 'Y' : 'N';
    const success = await changeTradeType(tradeId, { tradeYn });
    if (success) {
      alert('거래 상태가 변경되었습니다.');
    } else {
      alert('거래 상태 변경 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (trade) {
      const handleResize = () => {
        viewMap(trade, mapRef, setAddressInfo);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [trade, mapRef, setAddressInfo]);

  return (
      <div className="trade-details">
        {trade && (
            <div className="trade-info">
              <h1>{trade.book.name}</h1>
              <div className='write-info'>
                <div className={'user-info'}>
                  <div className="user-img">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/44/44463.png"
                        alt="Writer Icon"/>
                  </div>
                  <div className={'user-name'}>
                    {trade.user.nickname}
                  </div>
                </div>
                <div className="write-date">
                  {trade.createDate}
                </div>
              </div>
              <div className="book-info">
                <div className="book-img-area">
                  <div className="img-background"
                       style={{backgroundImage: `url(${trade.book.imageUrl})`}}/>
                  <div className="background-shadow"/>
                  <img src={trade.book.imageUrl} alt={trade.book.name}/>
                </div>
              </div>
              <div className={'trade-price'}>
                {trade.rentalCost.toLocaleString()} 원
              </div>
              <div className={'trade-content'}>
                {trade.content}
                <h3>반납 일자</h3>
                <div className={'limited-date'}>
                  {trade.limitedDate}
                </div>
              </div>
              <h3>거래 희망 위치</h3>
              <div id="map" className={'map-area'}></div>
              <p>{addressInfo}</p>
              {/*로그인한 사용자가 글 작성자와 일치할 경우에만 보이도록 수정 예정*/}
              <div className={'login-user-field'}>
                <div className={'change-trade-type'}>
                  <input type="checkbox" id="tradeComplete"
                         onChange={handleChangeTradeType}/>
                  <label className="custom-checkbox"
                         htmlFor="tradeComplete"></label>
                  <div className={'trade-type'}>거래완료</div>
                </div>
                <div className={'buttons'}>
                  {loginUserId === trade.user.tradeWriterId && (
                    <>
                      <Button type={'submit'}
                              className={'cancel-button'}
                              onClick={handleEditClick}>수정</Button>
                      <Button className={'submit-button'}
                              onClick={deleteTradeClick}>삭제</Button>
                    </>
                  )}
                </div>
              </div>
              <div className={'comment-area'}>
                <h3>댓글</h3>
                <CommentList
                    tradeId={tradeId}
                    tradeWriterId={trade.user.tradeWriterId}
                />
              </div>
            </div>
        )}
      </div>
  );
}