import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { searchBookList, updateBookStatus } from "../services/book/bookAPI";
import { getUserRole } from "../services/auth/token";

export default function RequestBookList() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("name");
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setUserRole(getUserRole);
    }
  }, []);

  const handleSearch = async () => {
    try {
      const list = await searchBookList(filter, keyword);

      const sortedList = list.sort((a, b) => {
        const order = {'WAIT': 1, 'APPROVE': 2, 'REJECT': 3};
        return order[a.approvalStatus] - order[b.approvalStatus];
      });

      setBooks(sortedList);
      setErrorMessage("");
    } catch (error) {
      setBooks([]);
      setErrorMessage(error.response.data.detail);
    }
  }
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  }

  const selectFilter = (e) => {
    setFilter(e.target.value);
  }

  const handleApproval = async (isbn) => {
    const response = await updateBookStatus(isbn, "APPROVE");
    const message = response.data?.message || response.message;
    if (message === undefined) {
      alert("승인 및 거절은 관리자만 가능합니다.");
    } else {
      alert(message);
    }
    await handleSearch();
  }

  const handleRejection = async (isbn) => {
    const response = await updateBookStatus(isbn, "REJECT");
    const message = response.data?.message || response.message;
    if (message === undefined) {
      alert("승인 및 거절은 관리자만 가능합니다.");
    } else {
      alert(message);
    }
    await handleSearch();
  }

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
                ? "요청 거절" : book.approvalStatus === "APPROVE"
                ? "요청 승인" : book.approvalStatus;

            return (
                <tr key={book.isbn}>
                  <td className="book-img-border">
                    <img src={book.imageUrl} alt={book.name}/>
                  </td>
                  <td className="book-info">
                    <p className="book-title"><span>도서명:</span> {book.name} / (ISBN 번호:{book.isbn})</p>
                    <p className="book-author">
                      <span>저자:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {book.authors}
                    </p>
                    <p className="book-publication-year">
                      <span>발행년도:</span>&nbsp;&nbsp;&nbsp; {book.publicationYear}
                    </p>
                    <p className="book-approvalStatus">
                      <span>요청 상태:</span>&nbsp;&nbsp; {approvalStatus}
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
      </div>
  );
}