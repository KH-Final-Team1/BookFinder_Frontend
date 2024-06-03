import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/Button";
import { useParams, useNavigate } from 'react-router-dom';
import {
  changeTradeType,
  deleteTrade,
  getTrade
} from "../../services/trade/tradeAPI";
import { viewMap } from "../../services/kakao/kakaoMap";
import CommentList from "./CommentList";
import { getUserId } from "../../services/auth/token";

export default function TradeDetails() {
  const loginUserId = getUserId();
  const { tradeId } = useParams();
  const [trade, setTrade] = useState(null);
  const [addressInfo, setAddressInfo] = useState('');
  const [tradeComplete, setTradeComplete] = useState(false);
  const alertShown = useRef(false);
  const mapRef = useRef(null);
  const navigate = useNavigate();


  const handleEditClick = () => {
    navigate(`/trade/edit/${tradeId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTrade(tradeId);
        setTrade(result);
        setTradeComplete(result.tradeYn === 'Y');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const detail = error.response.data.detail || '';
          if(!alertShown.current) {
            alertShown.current = true;
            alert(`${detail}`);
          }
          navigate('/trade/list');
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    };
    fetchData();
  }, [tradeId, navigate]);

  const deleteTradeClick = async () => {
    const result = await deleteTrade(tradeId);
    if (result) {
      navigate('/trade/list');
    }
  };

  const handleChangeTradeType = async (event) => {
    const newTradeComplete = event.target.checked;
    const tradeYn = newTradeComplete ? 'Y' : 'N';
    const success = await changeTradeType(tradeId, { tradeYn });
    if (success) {
      setTradeComplete(newTradeComplete);
      setTrade(prevTrade => ({
        ...prevTrade,
        tradeYn: newTradeComplete ? 'Y' : 'N'
      }));
      // alert('거래 상태가 변경되었습니다.');
    } else {
      alert('거래 상태 변경 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (trade && trade.latitude && trade.longitude) {
      const handleResize = () => {
        viewMap(trade, mapRef, setAddressInfo);
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else if (trade) {
      setAddressInfo('거래 위치를 등록하지 않았습니다.');
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
                        alt="Writer Icon" />
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
                       style={{ backgroundImage: `url(${trade.book.imageUrl})` }} />
                  <div className="background-shadow" />
                  <img src={trade.book.imageUrl} alt={trade.book.name} />
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
              {trade.latitude && trade.longitude ? (
                  <>
                    <div id="map" className={'map-area'}></div>
                    <p>{addressInfo}</p>
                  </>
              ) : (
                  <p>거래 위치를 등록하지 않았습니다.</p>
              )}
                <h3>거래 상태</h3>
              <div className={'login-user-field'}>
                <div className={'change-trade-type'}>
                  {trade.deleteYn === 'N' && loginUserId === trade.user.tradeWriterId && (
                      <>
                        <input type="checkbox"
                               id="tradeComplete"
                               checked={tradeComplete}
                               onChange={handleChangeTradeType} />
                        <label className="custom-checkbox"
                               htmlFor="tradeComplete">
                        </label>
                      </>
                    )}
                  <div className={'trade-type'}>
                    { trade.tradeYn === 'Y' ? '거래완료' : '거래중'}</div>
                </div>
                <div className={'buttons'}>
                  {trade.deleteYn === 'N' && loginUserId === trade.user.tradeWriterId && (
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