import Title from "../../components/ui/Title";
import React, {useEffect, useRef, useState} from "react";
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
import BookInput from "../../components/trade/BookInput";
import {getUserId} from "../../services/auth/token";

export default function BookTradeEdit() {
	const loginUserId = getUserId();
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
	const [isFree, setIsFree] = useState(false);
	const [loading, setLoading] = useState(false);
	const [locationError, setLocationError] = useState(false);
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
						if(fetchedTrade.deleteYn === 'N'){
							if(loginUserId === fetchedTrade.user.tradeWriterId) {
								console.log(fetchedTrade)
								setTrade(fetchedTrade);
								setISBN(fetchedTrade.book.isbn);
								setTradeType(fetchedTrade.tradeType);
								setRentalCost(fetchedTrade.rentalCost);
								setLimitedDate(fetchedTrade.limitedDate);
								setContent(fetchedTrade.content);
								setNewLatitude(fetchedTrade.latitude);
								setNewLongitude(fetchedTrade.longitude);
							} else {
								if (!alertShownRef.current) {
									alertShownRef.current = true;
									alert('게시글 수정은 작성자만 가능합니다.');
									navigate('/trade/list');
								}
							}
						} else {
							if (!alertShownRef.current) {
								alertShownRef.current = true;
								alert('삭제된 게시물 입니다.');
								navigate('/trade/list');
							}
						}
					}
				} catch (error) {
					console.error('Failed to fetch trade:', error);
					const detail = error.response.data.detail
					if (!alertShownRef.current) {
						alertShownRef.current = true;
						alert(`${detail}`);
						navigate('/trade/edit');
					}
				}
			}
			setLoading(false);
		};
		fetchTrade();
	}, [tradeId, navigate]);

	const handleTradeTypeChange = (type) => {
		setTradeType(type);
	};

	const handleEnrollTrade = async () => {
		if (!ISBN) {
			alert('ISBN은 필수 입력사항입니다');
			return;
		}

		if (!isFree && !rentalCost) {
			alert('금액은 필수 입력사항입니다');
			return;
		}

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
				navigate(`/trade/${tradeId}`);
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
				moveMarker(fetchedTrade.latitude, fetchedTrade.longitude, handleMarkerMove);
			} else {
				getCurrentPositionAndSetMarker();
			}
		} catch (error) {
			console.error('Failed to fetch trade:', error);
		}
	};

	const getCurrentPositionAndSetMarker = () => {
		navigator.geolocation.getCurrentPosition(success, fail);
	};

	const success = (pos) => {
		setLocationError(false);
		moveMarker(pos.coords.latitude, pos.coords.longitude, handleMarkerMove);
	};

	const fail = (err) => {
		setLocationError(true);
	};

	const handleMarkerMove = (newLatitude, newLongitude) => {
		setNewLatitude(newLatitude);
		setNewLongitude(newLongitude);
	};

	return (
			<div className={'trade-edit'}>
				<Title>거래 {!tradeId ? '등록' : '수정'} </Title>
				<div className={'edit-info'}>
					<BookInput
							ISBN={ISBN}
							trade={trade}
							setISBN={setISBN}
							setBook={setBook}
							tradeId={tradeId}
					/>
					<div>
						{(!trade) && (book || trade) && (
								<div>
									{(!trade) && (ISBN || trade) && (
											<BookInfo trade={trade} book={book} />
									)}
								</div>
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
								<PriceInput value={rentalCost} onChange={setRentalCost} onFreeChange={setIsFree} />
							</div>
							<div>
								<div className={'trade-section-title'}>반납일</div>
								<input type={'date'} name={'limitedDate'}
											 min={today}
											 value={limitedDate}
											 onChange={(event) => setLimitedDate(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<div className={'trade-section-title'}>내용</div>
							<textarea name="content" cols="30" rows="10"
												onChange={(event) => setContent(event.target.value)}
												value={content}
												className={'trade-content'}></textarea>
						</div>
					</div>
					<div className={'trade-section-title'}>거래 위치</div>
					<div id="map" className={'map-area'}>
						{locationError && (
								<div className="location-error">
									위치 정보를 불러올 수 없습니다.<br/>
									액세스를 허용해주세요.
								</div>
						)}
					</div>
					<div className={'buttons'}>
						<Button className={'cancel-button'} onClick={() => navigate('/trade/list')}>취소</Button>
						<Button className={'submit-button'}
										onClick={handleEnrollTrade}>
							{!tradeId ? ('등록') : ('수정')}
						</Button>
					</div>
				</div>
			</div>
	)
}