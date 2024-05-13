import Title from "../../components/ui/Title";
import React, {useEffect, useState} from "react";
import {getBookByISBN} from "../../services/book/bookAPI";
import Button from "../../components/ui/Button";

export default function BookTradeEdit() {
  const [book, setBook] = useState();
  const [ISBN, setISBN] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);

  const handleISBNChange = async (event) => {
    const {value} = event.target;
    setISBN(value);
    setBook(null);
    setNotFoundMessage(false);

    if (value.length === 13) {
      setLoading(true); // 로딩 상태 설정

      try {
        const result = await getBookByISBN(value);

        if (!result) {
          // 도서 정보가 없을 경우
          setBook(null);
          setNotFoundMessage(true); // 메시지 표시
        } else {
          // 도서 정보가 있을 경우
          setBook(result);
        }
      } catch (error) {
        console.error("도서 정보를 가져오는 중 오류가 발생했습니다:", error);
        setBook(null);
        setNotFoundMessage(true); // 메시지 표시
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    }
  };

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      console.log(`현위치 : ${lat}, ${lng}`);

      const kakaoMaps = window.kakao.maps;
      if (kakaoMaps) {
        const mapContainer = document.getElementById('map');

        const mapOption = {
          center: new kakaoMaps.LatLng(lat, lng),
          level: 3
        };

        const map = new kakaoMaps.Map(mapContainer, mapOption);

        // 현재 위치에 마커 생성
        const markerPosition = new kakaoMaps.LatLng(lat, lng);
        const marker = new kakaoMaps.Marker({
          position: markerPosition,
          draggable: true // 드래그 가능하도록 설정
        });

        marker.setMap(map);
      }
    };

    const fail = (err) => {
      alert('현위치를 찾을 수 없습니다.');
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return (
      <div className={'trade-edit'}>
        <Title>거래 등록</Title>
        <div className={'edit-info'}>
          <div className={'book-search'}>
            <div>
              <input className={'ISBN'}
                     placeholder={'ISBN 번호를 입력하세요'}
                     value={ISBN}
                     onChange={handleISBNChange}
              />
            </div>
            <div>
              <input className={'book-title'}
                     placeholder={'도서 제목을 입력하세요'}
              />
            </div>
          </div>
          <div>
            {!loading && book && (
                <div>
                  <hr/>
                  <div className="book-info">
                    {book.imageUrl && (
                        <div className="book-img">
                          <img src={book.imageUrl} alt={book.title}/>
                        </div>
                    )}
                    <div className="book-details">
                      <dl className="book-class">
                        <dt>주제 분류</dt>
                        <dd>{book.className}</dd>
                      </dl>
                      <dl className="book-author">
                        <dt>저자</dt>
                        <dd>{book.authors}</dd>
                      </dl>
                      <dl className="book-publisher">
                        <dt>출판사</dt>
                        <dd>{book.publisher}</dd>
                      </dl>
                      <dl className="book-publication-year">
                        <dt>발행일</dt>
                        <dd>{book.publicationYear}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
            )}
            {!loading && !book && notFoundMessage && (
                <p>도서 정보를 찾을 수 없습니다.</p>
            )}
          </div>
          <hr/>
          <div className={'trade'}>
            <div className={'trade-section-title'}>거래 방식</div>
            <Button className={'lend'}>빌려주기</Button>
            <Button className={'borrow'}>빌리기</Button>
            <div>
              <div className={'trade-section-title'}>금액</div>
              <input className={'trade-price'}
                     placeholder={'₩ 가격을 입력해주세요'}
              />
            </div>
            <div>
              <div className={'trade-section-title'}>내용</div>
              {<textarea name="content" id="" cols="30" rows="10"
                         className={'trade-content'}></textarea>}
            </div>
          </div>
          <div className={'trade-section-title'}>거래 위치</div>
          <div id="map" className={'map-area'}></div>
          <div className={'buttons'}>
            <Button className={'cancel-button'}>취소</Button>
            <Button className={'submit-button'}>등록</Button>
          </div>
        </div>
      </div>
  )
}