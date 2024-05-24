import React from "react";
import {useNavigate} from "react-router-dom";

export default function NoResult() {
  const navigate = useNavigate();

  const handleSrchISBN = () => {
    navigate('/search/isbn');
  }
  const handleRequest = () => {
    navigate('/requestBook/list');
  }
  return (
      <div className={'noResult'}>
        <h2>검색어에 해당하는 결과가 없습니다.</h2>
        <h4>다른 카테고리의 검색 결과도 확인해 보세요.</h4>
        <hr />
        <div className={'buttons'}>
          <button className={'searchISBN'} onClick={handleSrchISBN}>ISBN 번호로 검색</button>
          <button className={'request'} onClick={handleRequest}>도서 요청하기</button>
        </div>
      </div>
  )
}