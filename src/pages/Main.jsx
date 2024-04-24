export default function Main(){
  return(
      <div className={'main'}>
        <div className={'main-text'}>검색어를 입력하세요</div>
        <div className={'main-search'}>
          <div className={'search-div'}>
            <select className={'search-select'}>
              <option>책 제목</option>
              <option>글쓴이</option>
            </select>
          </div>
          <input className={'search-input'} type={"text"} placeholder={"검색어를 입력하세요"} />
          <button className={'search-button'}>
            <img src={'https://cdn.icon-icons.com/icons2/488/PNG/512/search_47686.png'} />
          </button>
        </div>
      </div>
  )
}