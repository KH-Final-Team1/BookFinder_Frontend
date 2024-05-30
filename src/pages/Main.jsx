import React, { useState } from 'react';
import SearchResult from "./SearchResult";
import {searchApproveBookList, searchBookList} from "../services/book/bookAPI";
import NoResult from "./NoResult";


export default function Main(){
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("name");
  const [bookList, setBookList] = useState([]);
  const [show, setShow] = useState(false);

  const handleSearch = async () => {
    setShow(true);
    const list = await searchApproveBookList(filter, keyword);
    console.log(list)
    setBookList(list);
  }
  function handleKeyword(e) {
    setKeyword(e.target.value);
  }
  function selectFilter(e){
    setFilter(e.target.value);
  }
  return(
      <div className={'main'}>
        <div className={'main-text'}>검색어를 입력하세요</div>
        <div className={'main-search'}>
          <div className={'search-div'}>
            <select className={'search-select'} value={ filter } onChange={ selectFilter }>
              <option value={'name'}>제목</option>
              <option value={'authors'}>저자</option>
              <option value={'publisher'}>출판사</option>
            </select>
          </div>
          <input className={'search-input'} type={"text"} placeholder={"검색어를 입력하세요"} value={keyword} onChange={ handleKeyword } />
          <button className={'search-button'} onClick={ handleSearch }>
            <img src={'https://cdn.icon-icons.com/icons2/488/PNG/512/search_47686.png'} />
          </button>
        </div>
        {
          show ?
              bookList.length === 0 ? <NoResult/>
              : <SearchResult bookList={bookList} />
          : <></>
        }
      </div>
  )
}