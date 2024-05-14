import Title from "../../components/ui/Title";
import React, {useEffect, useState} from "react";
import {getBookByISBN} from "../../services/book/bookAPI";
import Button from "../../components/ui/Button";
import {moveMarker} from "../../services/kakao/kakaoMap";
import {enrollTrade} from "../../services/trade/tradeAPI";
import {useNavigate} from "react-router-dom";

export default function BookTradeEdit() {
  const [book, setBook] = useState();
  const [ISBN, setISBN] = useState('');
  const [tradeType, setTradeType] = useState('LEND');
  const [rentalCost, setRentalCost] = useState('');
  const [limitedDate, setLimitedDate] = useState('');
  const [content, setContent] = useState('');
  const [newLatitude, setNewLatitude] = useState(null);
  const [newLongitude, setNewLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const navigate = useNavigate();

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
        setNotFoundMessage(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLendClick = () => {
    setTradeType('LEND');
  };

  const handleBorrowClick = () => {
    setTradeType('BORROW');
  };

  const submitTrade = async () => {
    const newTrade = {
      isbn: ISBN,
      tradeType: tradeType,
      rentalCost: rentalCost,
      limitedDate: limitedDate,
      content: content,
      latitude: newLatitude,
      longitude: newLongitude
    };

    try {
      await enrollTrade(newTrade);
      alert('거래 등록을 성공하였습니다.');
      navigate('/trade/list');
    } catch (error) {
      alert('거래 등록 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const success = (pos) => {
      moveMarker(pos.coords.latitude, pos.coords.longitude, handleMarkerMove);
    };

    const fail = (err) => {
      alert('현위치를 찾을 수 없습니다.');
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  const handleMarkerMove = (newLatitude, newLongitude) => {
    setNewLatitude(newLatitude);
    setNewLongitude(newLongitude);
  };

  return (
      <div className={'trade-edit'}>
        <Title>거래 등록</Title>
        <div className={'edit-info'}>
          <div className={'book-search'}>
            <div className={'input-area'}>
              <div className={'text'}>ISBN</div>
              <input className={'input-isbn'}
                     placeholder={'ISBN 번호를 입력하세요'}
                     value={ISBN}
                     name={'isbn'}
                     onChange={handleISBNChange}
              />
            </div>
            <div className={'title-area'}>
              <div className={'input-area'}>
                <div className={'text'}>도서 제목</div>
                <input className={'book-title'}
                       value={book ? book.name : ''}
                       placeholder={'도서 제목을 입력하세요'}
                />
              </div>
            </div>
          </div>
          <div>
            {!loading && book && (
                <div>
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
                  <hr/>
                </div>
            )}
            {!loading && !book && notFoundMessage && (
                <p>도서 정보를 찾을 수 없습니다.</p>
            )}
          </div>
          <div className={'trade'}>
            <div className={'trade-section-title'}>거래 방식</div>
            <Button className={tradeType === 'LEND' ? 'lend-active' : 'lend'}
                    onClick={handleLendClick}>빌려주기</Button>
            <Button
                className={tradeType === 'BORROW' ? 'borrow-active' : 'borrow'}
                onClick={handleBorrowClick}>빌리기</Button>
            <div className={'cost-date-area'}>
              <div className={'cost-area'}>
                <div className={'trade-section-title'}>금액</div>
                <input className={'trade-price'}
                       placeholder={'금액을 입력해주세요'}
                       onChange={(event) => setRentalCost(event.target.value)}
                />
              </div>
              <div>
                <div className={'trade-section-title'}>반납일</div>
                <input type={'date'} name={'limitedDate'}
                       min={today}
                       onChange={(event) => setLimitedDate(event.target.value)}
                />
              </div>
            </div>
            <div>
              <div className={'trade-section-title'}>내용</div>
              {<textarea name="content" cols="30" rows="10"
                         onChange={(event) => setContent(event.target.value)}
                         className={'trade-content'}></textarea>}
            </div>
          </div>
          <div className={'trade-section-title'}>거래 위치</div>
          <div id="map" className={'map-area'}></div>
          <div className={'buttons'}>
            <Button className={'cancel-button'}>취소</Button>
            <Button className={'submit-button'}
                    onClick={submitTrade}>등록</Button>
          </div>
        </div>
      </div>
  )
}