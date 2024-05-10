import React, { useState } from 'react';
import SearchResult from "./SearchResult";
import {searchBookList} from "../services/book/bookAPI";


export default function Main(){
  const [show, setShow] = useState(false)
  const handleSearch = () => {
    setShow(!show);
    searchBookList();
  }
  return(
      <div className={'main'}>
        <div className={'main-text'}>검색어를 입력하세요</div>
        <div className={'main-search'}>
          <div className={'search-div'}>
            <select className={'search-select'}>
              <option>제목</option>
              <option>저자</option>
              <option>출판사</option>
            </select>
          </div>
          <input className={'search-input'} type={"text"} placeholder={"검색어를 입력하세요"} />
          <button className={'search-button'} onClick={handleSearch}>
            <img src={'https://cdn.icon-icons.com/icons2/488/PNG/512/search_47686.png'} />
          </button>
          {
            show ?
            <SearchResult/>
                : <></>
          }
        </div>
      </div>
  )
}