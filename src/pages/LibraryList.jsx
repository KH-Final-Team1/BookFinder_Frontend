import React, {useState, useEffect, useRef} from "react";
import {useParams} from "react-router";
import {
  fetchBookInfo,
  getLibraryList,
  loanBook
} from "../services/book/booklibraryAPI";
import Button from "../components/ui/Button";

export default function LibraryList() {
  const {isbn} = useParams();
  const [bookDetail, setBookDetail] = useState({});
  const [libList, setLibList] = useState([]);
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loanStatus, setLoanStatus] = useState({});
  const loader = useRef(null);
  const isInitialLoad = useRef(true);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isInitialLoad.current && !isLoading) {
      setPage(prevState => prevState + 1);
    }
  }

  useEffect(() => {
    getBookDetail();
    const observer = new IntersectionObserver(handleObserver, {threshold: 1})
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    initLibraryList();
  }, [page])

  const getBookDetail = async () => {
    const bookInfo = await fetchBookInfo(isbn);
    if (bookInfo.response.detail) {
      setBookDetail(bookInfo.response.detail[0].book);
    }
  }

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
    if (loanInfo.response.result.loanAvailable === "Y") {
      setLoanStatus((prevStatus) => ({...prevStatus, [libCode]: "대출 가능"}));
    } else {
      setLoanStatus((prevStatus) => ({...prevStatus, [libCode]: "대출 불가능"}));
    }
  }

  const handleBack = () => {

  }

  return (
      <div className={'libraryList'}>
        <div>
          <Button className={'cancel-button'} onClick={handleBack}>목록</Button>
        </div>
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
        <div className={'library'}>
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
  )
}
