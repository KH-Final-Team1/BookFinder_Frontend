import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { createBook } from "../services/book/bookAPI";
import { fetchBookInfo } from "../services/book/booklibraryAPI";

export default function RequestBook() {
  const [isbn, setIsbn] = useState('');
  const [bookInfo, setBookInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIsbn(value);
    if (value.length !== 13) {
      setErrorMessage('ISBN 번호는 13자리의 숫자만 입력 가능합니다.');
    } else {
      setErrorMessage('');
    }
    setBookInfo(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getBookInfo();
    }
  };

  const getBookInfo = async () => {
    const data = await fetchBookInfo(isbn);
    if (data.response.detail && data.response.detail.length > 0) {
      setBookInfo(data.response.detail[0].book);
      setErrorMessage('');
    } else {
      setErrorMessage('유효하지 않은 ISBN 번호 입니다.');
      setBookInfo(null);
    }
  };

  const clickSubmit = async () => {
    if (isbn.length !== 13) {
      setErrorMessage('ISBN 번호는 13자리의 숫자만 입력 가능합니다.');
      return;
    }

    if (!bookInfo) {
      setErrorMessage('도서 정보를 먼저 검색해주세요.');
      return;
    }

    try {
      const response = await createBook({
        isbn,
        imageUrl: bookInfo.bookImageURL,
        name: bookInfo.bookname,
        className: bookInfo.class_nm,
        authors: bookInfo.authors,
        publisher: bookInfo.publisher,
        publicationYear: bookInfo.publication_year,
        classNo: bookInfo.class_no,
        description: bookInfo.description
      });
      setIsbn('');
      setBookInfo(null);
      setErrorMessage('');
      alert(response.message);
    } catch (error) {
      const errorMsg = error.response.data.detail;
      alert(errorMsg);
    }
  };

  return (
      <div className={'request-book'}>
        <input
            className={'search-isbn'}
            placeholder={'ISBN 번호를 입력하세요'}
            value={isbn}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <hr />
        {bookInfo && (
            <div className={'book'}>
              <div className={'book-img'}>
                <img src={bookInfo.bookImageURL} alt="책 표지" />
              </div>
              <div className={'book-info'}>
                <dl className={'book-title'}>
                  <dt>도서명</dt>
                  <dd>{bookInfo.bookname}</dd>
                </dl>
                <dl className={'book-class'}>
                  <dt>주제 분류</dt>
                  <dd>{bookInfo.class_nm}</dd>
                </dl>
                <dl className={'book-author'}>
                  <dt>저자</dt>
                  <dd>{bookInfo.authors}</dd>
                </dl>
                <dl className={'book-publisher'}>
                  <dt>출판사</dt>
                  <dd>{bookInfo.publisher}</dd>
                </dl>
                <dl className={'book-publication-year'}>
                  <dt>발행년도</dt>
                  <dd>{bookInfo.publication_year}</dd>
                </dl>
              </div>
            </div>
        )}
        <div className={'buttons'}>
          <Button type={'cancel'} onClick={() => navigate(-1)} className={'cancel-button'}>
            취소
          </Button>
          <Button type={'submit'} onClick={clickSubmit} className={'submit-button'}>
            등록
          </Button>
        </div>
      </div>
  );
}