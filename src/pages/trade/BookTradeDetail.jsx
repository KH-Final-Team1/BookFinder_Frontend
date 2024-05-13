import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/ui/Button";
import { deleteTrade, getTrade } from "../../services/trade/tradeAPI";
import kakaoMap from "../../services/kakao/kakaoMap";

export default function TradeDetails() {
  const tradeId = 3;
  const [trade, setTrade] = useState(null);
  const [addressInfo, setAddressInfo] = useState('');
  const mapRef = useRef(null); // Ref to store the map instance
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      const result = await getTrade(tradeId);
      setTrade(result);
    }
    fetchData();
  }, []);

  const deleteTradeClick = async () => {
    const result = await deleteTrade(tradeId);
    if (result) {
      navigate('/trade/list');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      kakaoMap(trade, mapRef, setAddressInfo);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [trade]);

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
                {trade.rentalCost} 원
              </div>
              <div className={'trade-content'}>
                {trade.content}
              </div>
              <hr/>
              <h3>거래 희망 위치</h3>
              <div id="map" className={'map-area'}></div>
              <p>{addressInfo}</p>
              {/*로그인한 사용자가 글 작성자와 일치할 경우에만 보이도록 수정 예정*/}
              <div className={'buttons'}>
                <Button type={'submit'}
                      className={'cancel-button'}>수정</Button>
                <Button className={'submit-button'} onClick={deleteTradeClick}>삭제</Button>
              </div>
              <hr/>
              <div className={'comment-area'}>
                <h3>댓글</h3>
                <div>댓글 필드 추가 예정</div>
              </div>
            </div>
        )}
      </div>
  );
}