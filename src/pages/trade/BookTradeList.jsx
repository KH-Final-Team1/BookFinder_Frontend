import React, {useEffect, useState} from "react";
import Button from "../../components/ui/Button";
import Title from "../../components/ui/Title";
import {Link} from "react-router-dom";
import {getTrades} from "../../services/trade/tradeAPI";
import {getBoroughId, getBoroughName} from "../../services/auth/token";

export default function BookTradeList() {
	const boroughId = getBoroughId();
	const boroughName = getBoroughName();
	const [trades, setTrades] = useState([]);

	useEffect(() => {
		const fetchTrades = async () => {
			try {
				const tradesData = await getTrades(boroughId);
				setTrades(tradesData);
			} catch (error) {
				console.error("Error fetching trades:", error);
			}
		};
		fetchTrades();
	}, [boroughId]);

	return (
			<div className="book-trades">
				<Title>{`${boroughName} 거래 목록`}</Title>
				<hr/>
				{trades.length > 0 ? (
						<div className='go-write-page'>
							<div className='write-button'>
								<Link to='/trade/edit'>
									<Button className='submit-button'>
										거래 등록
									</Button>
								</Link>
							</div>
						</div>
				) : (
						<div className={'noTrade'}>
							<h1>
								해당 지역의 거래 내역이 없습니다.
							</h1>
							<Link to={'/trade/edit'}>
								<Button className={'submit-button'}>
									거래 등록 하기
								</Button>
							</Link>
						</div>
				)}
				<table>
					<tbody>
					{trades.map(trade => {
						const tradeType = trade.tradeType === 'BORROW' ? "빌려요" : "빌려드려요"
						const tradeTypeColor = trade.tradeType === 'BORROW' ? "red"
								: "blue";
						const tradeYn = trade.tradeYn === 'Y' ? "거래완료" : "거래중"

						return (
								<Link to={`/trade/${trade.id}`} className="link">
									<tr key={trade.id}>
										<td className="book-img-border">
											<img src={trade.book.imageUrl} alt={trade.book.name}/>
										</td>
										<td className="trade-info">
											<p className="trade-type"
												 style={{color: tradeTypeColor}}>{tradeType}</p>
											<p className="book-title">{trade.book.name}</p>
											<p className="book-info">{trade.book.authors} / {trade.book.publicationYear}</p>
											<p className="writer-info">
												<img
														src="https://cdn-icons-png.flaticon.com/512/44/44463.png"
														alt="Writer Icon"/>
												{trade.user ? trade.user.nickname : "Unknown"}
											</p>
											<p className="trade-price">
												<img
														src="https://cdn-icons-png.flaticon.com/512/5633/5633965.png"
														alt="Price Icon"/>
												{trade.rentalCost.toLocaleString()} 원
											</p>
											<div>
												<p className='trade-yn'>{tradeYn}</p>
												<p className="create-date">{trade.createDate}</p>
											</div>
										</td>
									</tr>
								</Link>
						);
					})}
					</tbody>
				</table>
			</div>
	);
}