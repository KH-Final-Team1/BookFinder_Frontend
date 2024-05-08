import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/ui/Button";

export default function BookTradeList() {
  const boroughId = 1;
  const [trades, setTrades] = useState([]);
  const goWritePage = () => {
    // 글쓰기 페이지로 이동하기 구현 예정
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/trades/list/${boroughId}`)
    .then(response => {
      setTrades(response.data);
      console.log(response.data);
    })
    .catch(error => console.error("Error fetching trades:", error));
  }, []);

  return (
      <div className="book-trades">
        <h1>{trades.length > 0 ? `${trades[0].borough.name} 거래 목록` : ""}</h1>
        <hr />
        <div className='go-write-page'>
          <div className='write-button'>
            <Button type={'submit'} onClick={goWritePage}
                    className={'submit-button'}>글쓰기</Button>
          </div>
        </div>
        <table>
          <tbody>
          {trades.map(trade => {
            const date = new Date(trade.createDate);
            const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const tradeType = trade.tradeType == 'BORROW' ? "빌려요" : "빌려드려요"
            const tradeTypeColor = trade.tradeType === 'BORROW' ? "red" : "blue";
            const tradeYn = trade.tradeYn == 'Y' ? "거래완료" : "거래중"

            return (
                <tr key={trade.id}>
                  <td className="book-img-border">
                    <img src={trade.book.imageUrl} alt={trade.book.name} />
                  </td>
                  <td className="trade-info">
                    <p className="trade-type" style={{ color: tradeTypeColor }}>{tradeType}</p>
                    <p className="book-title">{trade.book.name}</p>
                    <p className="book-info">{trade.book.authors} / {trade.book.publicationYear}</p>
                    <p className="writer-info">
                      <img src="https://cdn-icons-png.flaticon.com/512/44/44463.png" alt="Writer Icon" />
                      {trade.user ? trade.user.nickname : "Unknown"}
                    </p>
                    <p className="trade-price">
                      <img src="https://cdn-icons-png.flaticon.com/512/5633/5633965.png" alt="Price Icon" />
                      {trade.rentalCost} 원
                    </p>
                    <div>
                      <p className='trade-yn'>{tradeYn}</p>
                      <p className="create-date">{formattedDate}</p>
                    </div>
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
}