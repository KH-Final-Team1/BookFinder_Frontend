import Title from "../../components/ui/Title";
import React, {useEffect, useRef, useState} from "react";
import {getBookByISBN} from "../../services/book/bookAPI";
import Button from "../../components/ui/Button";
import {moveMarker} from "../../services/kakao/kakaoMap";
import {
	enrollTrade,
	getTrade,
	updateTrade
} from "../../services/trade/tradeAPI";
import {useParams, useNavigate} from "react-router-dom";
import BookInfo from "../../components/trade/BookInfo";
import PriceInput from "../../components/trade/PriceInput";

export default function BookTradeEdit() {
	const {tradeId} = useParams();
	const [trade, setTrade] = useState(null);
	const alertShownRef = useRef(false);
	const [book, setBook] = useState();
	const [ISBN, setISBN] = useState('');
	const [tradeType, setTradeType] = useState('LEND');
	const [rentalCost, setRentalCost] = useState('');
	const [limitedDate, setLimitedDate] = useState('');
	const [content, setContent] = useState('');
	const [newLatitude, setNewLatitude] = useState(null);
	const [newLongitude, setNewLongitude] = useState(null);
	const [loading, setLoading] = useState(false);
	const [notFoundMessage, setNotFoundMessage] = useState(false);
	const today = new Date().toISOString().slice(0, 10);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchTrade = async () => {
			if (tradeId) {
				try {
					const fetchedTrade = await getTrade(tradeId);
					if (!fetchedTrade) {
						if (!alertShownRef.current) {
							alertShownRef.current = true;
							alert('해당 거래 내용이 없습니다');
							navigate('/trade/edit');
						}
					} else {
						console.log(fetchedTrade)
						setTrade(fetchedTrade);
						setISBN(fetchedTrade.book.isbn);
						setTradeType(fetchedTrade.tradeType);
						setRentalCost(fetchedTrade.rentalCost);
						setLimitedDate(fetchedTrade.limitedDate);
						setContent(fetchedTrade.content);
						setNewLatitude(fetchedTrade.latitude);
						setNewLongitude(fetchedTrade.longitude);
					}
				} catch (error) {
					console.error('Failed to fetch trade:', error);
					if (!alertShownRef.current) {
						alertShownRef.current = true;
						alert('거래 정보를 불러오는데 실패했습니다');
						navigate('/trade/edit');
					}
				}
			}
			setLoading(false);
		};
		fetchTrade();
	}, [tradeId, navigate]);

	const handleISBNChange = async (event) => {
		const {value} = event.target;
		setISBN(value);
		setBook(null);
		setNotFoundMessage(false);

		if (value.length === 13) {
			setLoading(true);

			try {
				const result = await getBookByISBN(value);
				if (!result) {
					setBook(null);
					setNotFoundMessage(true);
				} else {
					setBook(result);
				}
			} catch (error) {
				console.error("도서 정보를 가져오는 중 오류가 발생했습니다:", error);
				setBook(null);
				setNotFoundMessage(true);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleTradeTypeChange = (type) => {
		setTradeType(type);
	};

	const handleEnrollTrade = async () => {
		const newTrade = {
			isbn: ISBN,
			tradeType: tradeType,
			rentalCost: rentalCost,
			limitedDate: limitedDate,
			content: content,
			latitude: newLatitude,
			longitude: newLongitude
		};

		try {
			if (tradeId) {
				await updateTrade(tradeId, newTrade);
				alert('거래 수정이 성공하였습니다.');
				navigate(`/trade/${tradeId}`)
			} else {
				await enrollTrade(newTrade);
				alert('거래 등록을 성공하였습니다.');
				navigate('/trade/list');
			}
		} catch (error) {
			alert('거래 등록 중 오류가 발생했습니다.');
		}
	};

	useEffect(() => {
		if (!tradeId) {
			getCurrentPositionAndSetMarker();
		} else {
			fetchTradeAndSetMarker();
		}
	}, [tradeId]);

	const fetchTradeAndSetMarker = async () => {
		try {
			const fetchedTrade = await getTrade(tradeId);
			if (fetchedTrade) {
				moveMarker(fetchedTrade.latitude, fetchedTrade.longitude,
						handleMarkerMove);
			} else {
				getCurrentPositionAndSetMarker();
			}
		} catch (error) {
			console.error('Failed to fetch trade:', error);
			alert('거래 정보를 불러오는데 실패했습니다');
			navigate('/trade/edit');
		}
	};

	const getCurrentPositionAndSetMarker = () => {
		navigator.geolocation.getCurrentPosition(success, fail);
	};

	const success = (pos) => {
		moveMarker(pos.coords.latitude, pos.coords.longitude, handleMarkerMove);
	};

	const fail = (err) => {
		alert('현위치를 찾을 수 없습니다.');
	};

	const handleMarkerMove = (newLatitude, newLongitude) => {
		setNewLatitude(newLatitude);
		setNewLongitude(newLongitude);
	};

	return (
			<div className={'trade-edit'}>
				<Title>거래 {!tradeId ? '등록' : '수정'} </Title>
				<div className={'edit-info'}>
					<div className={'book-search'}>
						<div className={'input-area'}>
							<div className={'text'}>ISBN</div>
							<input
									className={`input-isbn${tradeId ? '-readonly' : ''}`}
									placeholder={tradeId ? '' : 'ISBN 번호를 입력하세요'}
									value={ISBN}
									name={'isbn'}
									onChange={tradeId ? undefined : handleISBNChange}
									readOnly={tradeId}
							/>
						</div>
						<div className={'title-area'}>
							<div className={'input-area'}>
								<div className={'text'}>도서 제목</div>
								<input
										className={`book-title${tradeId ? '-readonly' : ''}`}
										value={tradeId ? trade?.book.name : book?.name}
										readOnly={tradeId}
										placeholder={tradeId ? '' : '도서 제목을 입력하세요'}
								/>
							</div>
						</div>
					</div>
					<div>
						{(!trade || !loading) && (book || trade) && (
								<div>
									{(!trade || !loading) && (book || trade) && (
											<BookInfo trade={trade} book={book}/>
									)}
								</div>
						)}
						{!loading && !book && notFoundMessage && (
								<p>도서 정보를 찾을 수 없습니다.</p>
						)}
					</div>
					<div className={'trade'}>
						<div className={'trade-section-title'}>거래 방식</div>
						<Button
								className={tradeType === 'LEND' ? 'lend-active' : 'lend'}
								disabled={trade}
								onClick={() => handleTradeTypeChange('LEND')}
						>
							빌려주기
						</Button>
						<Button
								className={tradeType === 'BORROW' ? 'borrow-active' : 'borrow'}
								disabled={trade}
								onClick={() => handleTradeTypeChange('BORROW')}
						>
							빌리기
						</Button>
						<div className={'cost-date-area'}>
							<div className={'cost-area'}>
								<div className={'trade-section-title'}>금액</div>
								<PriceInput value={rentalCost} onChange={setRentalCost} />
							</div>
							<div>
								<div className={'trade-section-title'}>반납일</div>
								<input type={'date'} name={'limitedDate'}
											 min={today}
											 value={limitedDate}
											 onChange={(event) => setLimitedDate(
													 event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div className={'trade-section-title'}>내용</div>
							{<textarea name="content" cols="30" rows="10"
												 onChange={(event) => setContent(
														 event.target.value)}
												 value={content}
												 className={'trade-content'}></textarea>}
						</div>
					</div>
					<div className={'trade-section-title'}>거래 위치</div>
					<div id="map" className={'map-area'}></div>
					<div className={'buttons'}>
						<Button className={'cancel-button'}>취소</Button>
						<Button className={'submit-button'}
										onClick={handleEnrollTrade}>
							{!tradeId ? ('등록') : ('수정')}</Button>
					</div>
				</div>
			</div>
	)
}