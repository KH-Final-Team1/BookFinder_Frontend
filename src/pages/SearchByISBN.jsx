import React, {useEffect, useRef, useState} from "react";
import Button from "../components/ui/Button";
import {fetchBookInfo, getLibraryList, loanBook} from "../services/book/booklibraryAPI";

export default function SearchByISBN() {
  const [isbn, setIsbn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookDetail, setBookDetail] = useState(null);
  const [libList, setLibList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loanStatus, setLoanStatus] = useState({});
  const [totalLibs, setTotalLibs] = useState(0);
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
    if (event.key === 'Enter') {
      setPage(1);
      getBookDetail();
    }
  }

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && libList.length < totalLibs) {
      setPage(prevState => prevState + 1);
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {threshold: 1});
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    }
  }, [loader.current])

  useEffect(() => {
    if (isbn.length === 13 && page>1) {
      loadLibraryList();
    }
  }, [page]);

  const getBookDetail = async () => {
    if (isbn.length === 13) {
      const bookInfo = await fetchBookInfo(isbn);
      if (bookInfo.response.detail) {
        setBookDetail(bookInfo.response.detail[0].book);
        setLibList([]);
        setLoanStatus({});
        setTotalLibs(0);
        loadLibraryList(1, true);
      } else {
        setErrorMessage('유효하지 않은 ISBN 번호입니다.');
        setBookDetail(null);
      }
    }
  };

  const loadLibraryList = async (currentPage = page, resetList = false ) => {
    if (isbn.length !== 13) {
      return;
    }
    setIsLoading(true);
    try {
      const libInfo = await getLibraryList(isbn, currentPage);
      if(resetList) {
        setLibList(libInfo.response.libs);
      } else {
        setLibList((prevList) => [...prevList, ...libInfo.response.libs]);
      }
      setTotalLibs(libInfo.response.numFound);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const loanAvailable = async (libCode) => {
    const loanInfo = await loanBook(libCode, isbn);
    if (loanInfo.response.result.loanAvailable === 'Y') {
      setLoanStatus((prevStatus) => ({...prevStatus, [libCode]: "대출 가능"}));
    } else {
      setLoanStatus((prevState) => ({...prevState, [libCode]: "대출 불가능"}));
    }
  }
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  }
  const sortedLibList = () => {
    if(sortOrder === "name") {
      return [...libList].sort((a,b) => a.lib.libName.localeCompare(b.lib.libName));
    }
    return libList;
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
              <hr/>
              <div className={'libraries'}>
                <select className={'sort-select'} onChange={handleSortChange}>
                  <option value={""}>선택하세요</option>
                  <option value={"name"}>이름순</option>
                  <option value={"distance"}>거리순</option>
                </select>
                <div className={'libResult'}>
                  {libList.length === 0 && !isLoading && (
                    <p>해당 도서를 소장하고 있는 도서관이 없습니다.</p>
                  )}
                  <ul className={'library-list'}>
                    {sortedLibList().map((data, idx) => {
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
                  {libList.length < totalLibs && (
                    <div ref={loader} style={{height: "10px"}}>Loading...</div>
                  )}
                </div>
              </div>
            </div>
        )}
      </div>
  )
}
