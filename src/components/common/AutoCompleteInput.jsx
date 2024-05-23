import React, {useState, useEffect} from 'react';

const AutoCompleteInput = ({
	tradeId,
	trade,
	dataList,
	onSelect,
	onChange,
	value
}) => {
	const [nowIndex, setNowIndex] = useState(0);
	// 자동완성 상태 관리
	const [showAutoComplete, setShowAutoComplete] = useState(false);
	const [inputValue, setInputValue] = useState(value || '');

	useEffect(() => {
		setInputValue(value || '');
		// ISBN 값이 변경될 때 도서 제목의 입력값 업데이트
	}, [value]);

	const handleKeyUp = (event) => {
		const matchDataList = inputValue ? dataList.filter(
				(book) => book.name.includes(inputValue)) : [];

		switch (event.keyCode) {
			case 38: // UP KEY
				setNowIndex(Math.max(nowIndex - 1, 0));
				break;
			case 40: // DOWN KEY
				setNowIndex(Math.min(nowIndex + 1, matchDataList.length - 1));
				break;
			case 13: // ENTER KEY
				if (inputValue) {
					const selectedBook = matchDataList[nowIndex] || {};
					onSelect(selectedBook);
					setNowIndex(0);
					setShowAutoComplete(false);
				}
				break;
			default:
				setNowIndex(0);
				setShowAutoComplete(!!matchDataList.length);
				break;
		}
	};

	const handleChange = (event) => {
		const inputValue = event.target.value;
		setInputValue(inputValue);
		onChange(inputValue);
		setShowAutoComplete(!!inputValue);
	};

	const showList = (data, nowIndex) => {
		const inputValueLowerCase = inputValue.toLowerCase();

		return data.map((book, index) => {
			const bookName = book.name.toLowerCase(); // 대소문자 구분 없이 도서 이름을 소문자로 변환
			const startIndex = bookName.indexOf(inputValueLowerCase); // 입력값이 도서 이름에서 시작하는 인덱스 찾기
			const endIndex = startIndex + inputValue.length; // 입력값의 끝 인덱스 계산

			return (
					<div className={nowIndex === index ? 'active' : ''} key={index}
							 onClick={() => handleSelect(book)}>
                <span>
                    {startIndex !== -1 ? (
												<>
													{book.name.substring(0, startIndex)}
													<mark>{book.name.substring(startIndex,
															endIndex)}</mark>
													{book.name.substring(endIndex)}
												</>
										) : (
												book.name
										)}
                </span>
					</div>
			);
		});
	};

	const handleSelect = (book) => {
		onSelect(book);
		setInputValue(book.name);
		setShowAutoComplete(false);
	};

	return (
			<div className="title-group">
				<input
						className={`book-title${tradeId ? '-readonly' : ''}`}
						type="text"
						value={tradeId && trade ? trade.book.name : inputValue}
						onChange={handleChange}
						onKeyUp={handleKeyUp}
						autoComplete="off"
						placeholder={tradeId ? '' : '도서 제목을 입력하세요'}
						readOnly={tradeId}
				/>
				{showAutoComplete && (
						<div className="autocomplete">
							{showList(dataList, nowIndex)}
						</div>
				)}
			</div>
	);
};

export default AutoCompleteInput;
