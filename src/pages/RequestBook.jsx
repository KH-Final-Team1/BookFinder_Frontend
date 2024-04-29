import Button from "../components/ui/Button";

const clickSubmit = () => {
  // console.log('제출클릭')
  // 등록 시 수행할 js 코드 입력
}

const clickCancel = () => {
  // console.log('제출클릭')
  // 취소 시 수행할 js 코드 입력
}
export default function RequestBook() {
  return (
      <div className={'requestBook'}>
        <input className={'search-isbn'} placeholder={'ISBN 번호를 입력하세요'}/>
        <hr/>
        <div className={'book'}>
          <div className={'book-img'}>
            <img src={'https://image.aladin.co.kr/product/29861/97/cover/8931466595_1.jpg'}/>
          </div>
          <div className={'book-info'}>
            <dl className={'book-title'}>
              <dt>도서명</dt>
              <dd>(그림으로 배우는) 웹 구조 =Web technology</dd>
            </dl>
            <dl className={'book-class'}>
              <dt>주제 분류</dt>
              <dd>프로그래밍, 프로그램, 데이터</dd>
            </dl>
            <dl className={'book-author'}>
              <dt>저자</dt>
              <dd>니시무라 야스히로 저 ;유세라 역</dd>
            </dl>
            <dl className={'book-publisher'}>
              <dt>출판사</dt>
              <dd>Youngjin.com(영진닷컴)</dd>
            </dl>
            <dl className={'book-publication-year'}>
              <dt>발행일</dt>
              <dd>2022</dd>
            </dl>
          </div>
        </div>
        <div className={'buttons'}>
          <Button type={'cancel'} onClick={clickCancel} className={'cancel-button'}>
            취소
          </Button>
          <Button type={'submit'} onClick={clickSubmit} className={'submit-button'}>
            등록
          </Button>
        </div>
      </div>
  )
}