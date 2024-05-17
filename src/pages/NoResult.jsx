import React from "react";

export default function NoResult() {
  return (
      <div className={'noResult'}>
        <h2>검색어에 해당하는 결과가 없습니다.</h2>
        <h4>다른 카테고리의 검색 결과도 확인해 보세요.</h4>
        <hr />
        <div className={'buttons'}>
          <button className={'requestISBN'}>ISBN 번호로 검색</button>
        </div>
      </div>
  )
}