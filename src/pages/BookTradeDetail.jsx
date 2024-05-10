import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import DeleteTrade from "../services/DeleteTrade";

export default function TradeDetails() {
  const tradeId = 3;
  const [trade, setTrade] = useState(null);
  const [addressInfo, setAddressInfo] = useState('');
  const mapRef = useRef(null); // Ref to store the map instance

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/trades/${tradeId}`)
    .then(response => {
      setTrade(response.data);
    })
    .catch(error => console.error("Error fetching trade:", error));
  }, []);

  useEffect(() => {
    const kakaoMaps = window.kakao.maps;

    const handleResize = () => {
      if (trade && kakaoMaps) {
        const container = document.getElementById('map');
        const options = {
          center: new kakaoMaps.LatLng(trade.latitude, trade.longitude),
          level: 3
        };
        const map = new kakaoMaps.Map(container, options);
        mapRef.current = map;

        const marker = new kakaoMaps.Marker({
          position: options.center
        });
        const geocoder = new kakaoMaps.services.Geocoder();

        const updateAddressInfo = () => {
          const mapInstance = mapRef.current;
          if (mapInstance) {
            geocoder.coord2Address(trade.longitude, trade.latitude, (result, status) => {
              if (status === kakaoMaps.services.Status.OK) {
                const address = result[0]?.road_address?.address_name || '장소를 표시할 수 없습니다.';
                setAddressInfo(address);
              }
            });
          }
        };
        updateAddressInfo();
        map.setDraggable(false);
        map.setZoomable(false);
        marker.setMap(map);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [trade]);

  const deleteTradeInstance = DeleteTrade({ tradeId });

  const handleDeleteClick = () => {
    deleteTradeInstance.handleDelete();
  };

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
                  {new Date(trade.createDate).toISOString().slice(0, 10)}
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
                <Button className={'submit-button'} onClick={handleDeleteClick}>삭제</Button>
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