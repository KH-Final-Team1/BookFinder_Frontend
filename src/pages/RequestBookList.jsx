import React, { useEffect, useState, useRef, useCallback } from "react";
import Button from "../components/ui/Button";
import { searchBookList, updateBookStatus } from "../services/book/bookAPI";
import { getUserRole } from "../services/auth/token";
import debounce from 'lodash.debounce';

export default function RequestBookList() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("name");
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const loader = useRef(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const currentPage = books.length < 10 ? 0 : page;
      const list = await searchBookList(filter, searchKeyword, "WAIT", currentPage);
      setBooks(prevBooks => {
        const newBooks = currentPage === 0 ? list : [...prevBooks, ...list];
        const uniqueBooks = newBooks.filter((book, index, self) =>
          index === self.findIndex((b) => b.isbn === book.isbn)
        );
        return uniqueBooks;
      });
      setHasMore(list.length === 10);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  }, [filter, searchKeyword, page, books.length]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    loadBooks();
  }, [loadBooks]);

  const handleSearch = useCallback(() => {
    setPage(1);
    setBooks([]);
    setHasMore(true);
    setSearchKeyword(keyword)
  }, [keyword]);

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const selectFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleApproval = async (isbn) => {const response = await updateBookStatus(isbn, "APPROVE");
    const message = response.data?.message || response.message;
    alert(message);
    await handleSearch();
  }

  const handleRejection = async (isbn) => {const response = await updateBookStatus(isbn, "REJECT");
    const message = response.data?.message || response.message;;
    alert(message);
    await handleSearch();
  }

  const handleScroll = useCallback(debounce(() => {
    if (loader.current && loader.current.getBoundingClientRect().bottom <= window.innerHeight) {
      if (hasMore && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    }
  }, 100), [hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
      <div className="request-books">
        <h1>도서 요청 게시판</h1>
        <hr/>
        <div className={'request-search'}>
          <div className={'search-div'}>
            <select className={'search-select'} value={filter}
                    onChange={selectFilter}>
              <option value={'name'}>제목</option>
              <option value={'authors'}>저자</option>
              <option value={'publisher'}>출판사</option>
            </select>
          </div>
          <input className={'search-input'} type={"text"}
                 placeholder={"검색어를 입력하세요"} value={keyword}
                 onChange={handleKeyword}/>
          <button className={'search-button'} onClick={handleSearch}>
            <img src={'https://cdn.icon-icons.com/icons2/488/PNG/512/search_47686.png'} alt="책 표지"/>
          </button>
        </div>
        <br/><br/><br/>
        {errorMessage && <p>{errorMessage}</p>}
        <table>
          <tbody>
          {books.map(book => {
            const approvalStatus = book.approvalStatus === "WAIT"
                ? "요청 대기 중" : book.approvalStatus === "REJECT"
                    ? "요청 거절" : book.approvalStatus;
            return (
                <tr key={book.isbn}>
                  <td className="book-img-border">
                    <img src={book.imageUrl} alt={book.name}/>
                  </td>
                  <td className="book-info">
                    <p className="book-title"><span>도서명:</span> {book.name} / (ISBN 번호:{book.isbn})</p>
                    <p className="book-author"><span>저자:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {book.authors}</p>
                    <p className="book-publication-year"><span>발행년도:</span>&nbsp;&nbsp;&nbsp; {book.publicationYear}</p>
                    <p className="book-approvalStatus"><span>요청 상태:</span>&nbsp;&nbsp; {approvalStatus}
                      {userRole === "ROLE_ADMIN" && book.approvalStatus === "WAIT" && (
                          <div className="buttons">
                            <Button type={'submit'} className={'submit-button'} onClick={() => handleApproval(book.isbn)}>승인</Button>
                            <Button type={'submit'} className={'cancel-button'} onClick={() => handleRejection(book.isbn)}>거절</Button>
                          </div>
                      )}
                    </p>
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      <div ref={loader}>Loading...</div>
    </div>
  );
}