import React, {useEffect, useRef, useState} from "react";
import Button from "../components/ui/Button";
import {fetchBookInfo, getLibraryList, loanBook} from "../services/book/booklibraryAPI";

export default function SearchByISBN (){
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookDetail, setBookDetail] = useState(null);
  const [libList, setLibList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState({});
  const isInitialLoad = useRef(true);
  const loader = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setIsbn(value);
    if (value === '') {
      setErrorMessage('');
    } else if (value.length !== 13) {
      setErrorMessage('ISBN 번호는 13자리의 숫자만 입력 가능합니다.');
    } else {
      setErrorMessage('');
    }
    setBookDetail(null);
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      getBookDetail();
      setPage(1);
      setLibList([]);
      initLibraryList(1);
    }
  }

  const handleObserver = (entries) => {
    const target = entries[0];
    if(target.isIntersecting && !isInitialLoad.current && !isLoading) {
      setPage(prevState => prevState + 1);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {threshold: 1});
    if(loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if(loader.current) {
        observer.unobserve(loader.current);
      }
    }
  }, []);

  useEffect( () => {
    console.log(page)
    if(isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    initLibraryList();
  }, [page]);

  const getBookDetail = async () => {
    if (isbn.length === 13) {
      const bookInfo = await fetchBookInfo(isbn);
      if (bookInfo.response.detail) {
        setBookDetail(bookInfo.response.detail[0].book);
      } else {
        setErrorMessage('유효하지 않은 ISBN 번호입니다.');
        setBookDetail(null);
      }
    }
  };

  const initLibraryList = async () => {
    setIsLoading(true);
    try {
      const libInfo = await getLibraryList(isbn, page);
      const list = libList;
      list.push(...libInfo.response.libs);
      setLibList(list);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const loanAvailable = async (libCode) => {
    const loanInfo = await loanBook(libCode, isbn);
    if(loanInfo.response.result.loanAvailable === 'Y') {
      setLoanStatus((prevStatus) => ({...prevStatus, [libCode]: "대출 가능"}));
    } else {
      setLoanStatus((prevState) => ({...prevState, [libCode]: "대출 불가능"}));
    }
  }
  return (
      <div className={'search-isbn'}>
        <input
            className={'input-isbn'}
            placeholder={'ISBN 번호를 입력하세요'}
            value={isbn}
            maxLength={13}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
        />
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        <hr />
        {bookDetail && (
            <div className={'result-list'}>
              <div className={'book'}>
                <img
                    src={bookDetail.bookImageURL}/>
                <div className={'book-info'}>
                  <dl className={'book-title'}>
                    <dt>도서명</dt>
                    <dd>{bookDetail.bookname}</dd>
                  </dl>
                  <dl className={'book-author'}>
                    <dt>저자</dt>
                    <dd>{bookDetail.authors}</dd>
                  </dl>
                  <dl className={'book-publication-year'}>
                    <dt>출판연도</dt>
                    <dd>{bookDetail.publication_year}</dd>
                  </dl>
                  <dl className={'book-publisher'}>
                    <dt>출판사</dt>
                    <dd>{bookDetail.publisher}</dd>
                  </dl>
                  <dl className={'book-description'}>
                    <dt>소개 및 줄거리</dt>
                    <dd>{bookDetail.description}</dd>
                  </dl>
                </div>
              </div>
              <div className={'libraries'}>
                {/*<p>전체 {libList.length}건</p>*/}
                <select className={'sort-select'}>
                  <option>이름순</option>
                  <option>거리순</option>
                </select>
                <div className={'libResult'}>
                  <ul className={'library-list'}>
                    {libList.map((data, idx) => {
                      return <li className={'library-detail'} key={"lib_" + idx}>
                        <div className={'library'}>
                          <p>{data.lib.libName}</p>
                          <dl className={'operatingTime'}>
                            <dt>이용시간</dt>
                            <dd>{data.lib.operatingTime}</dd>
                          </dl>
                          <dl className={'closed'}>
                            <dt>휴관일</dt>
                            <dd>{data.lib.closed}</dd>
                          </dl>
                          <dl className={'tel'}>
                            <dt>전화번호</dt>
                            <dd>{data.lib.tel}</dd>
                          </dl>
                          <dl className={'homepage'}>
                            <dt>홈페이지</dt>
                            <dd><a href={data.lib.homepage}>{data.lib.homepage}</a>
                            </dd>
                          </dl>
                          <dl className={'address'}>
                            <dt>주소</dt>
                            <dd>{data.lib.address}</dd>
                          </dl>
                          <dl className={'loan-available'}>
                            <dt>대출여부</dt>
                            <dd className={'loan'}>
                              {loanStatus[data.lib.libCode] ? (loanStatus[data.lib.libCode])
                                  : <Button className={'submit-button'} onClick={() => loanAvailable(data.lib.libCode)}>
                                    클릭하여 조회
                                  </Button>}
                            </dd>
                          </dl>
                        </div>
                        <hr/>
                      </li>
                    })}
                  </ul>
                  <div ref={loader} style={{height: "10px"}}>Loading...</div>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}
