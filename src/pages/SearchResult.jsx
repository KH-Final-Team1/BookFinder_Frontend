import React from "react";

export default function SearchResult(props) {

  return (
      <div className={'searchResult'}>
        <ul className={'book-list'}>
          {props.bookList.map((book, idx)=> {
            return <li className={'book-detail'} key={"book_"+idx}>
              <div className={'book'}>
                <img
                    src={book.imageUrl}
                    alt={'도서이미지'}/>
              </div>
              <div className={'book-info'}>
                <dl className={'book-title'}>
                  <dt>도서명</dt>
                  <dd>{book.name}</dd>
                </dl>
                <dl className={'book-author'}>
                  <dt>저자</dt>
                  <dd>{book.authors}</dd>
                </dl>
                <dl className={'book-publisher'}>
                  <dt>출판사</dt>
                  <dd>{book.publisher}</dd>
                </dl>
                <dl className={'book-publication-year'}>
                  <dt>출판연도</dt>
                  <dd>{book.publicationYear}</dd>
                </dl>
              </div>
            </li>
          })}
        </ul>
      </div>
  )
}