import React, { useState, useEffect } from 'react';
import { getBookByISBN, searchBookList } from "../../services/book/bookAPI";
import AutoCompleteInput from "../common/AutoCompleteInput";

const BookInput = ({ ISBN, trade, setISBN, setBook, tradeId }) => {
	const [bookName, setBookName] = useState('');
	const [dataList, setDataList] = useState([]);
	const valueToDisplay = ISBN ? bookName : '';

	const handleISBNChange = async (event) => {
		const { value } = event.target;
		setISBN(value);
		setBook(null);

			try {
				const result = await getBookByISBN(value);
				if (!result) {
					setBook(null);
					setBookName('');
				} else {
					setBook(result);
					setBookName(result.name);
				}
			} catch (error) {
				setBook(null);
				setBookName('');
			}
	};

	const handleBookNameChange = async (value) => {
		setBookName(value);
		if (value.length >= 2) {
			try {
				const books = await searchBookList('name', value, 'APPROVE');
				if (books.length > 0) {
					setDataList(books);
				} else {
					setDataList([]);
				}
			} catch (error) {
				setDataList([]);
			}
		} else {
			setDataList([]);
		}
	};

	const handleBookSelect = (selectedBook) => {
		setISBN(selectedBook.isbn);
		setBook(selectedBook);
		setBookName(selectedBook.name);
	};

	return (
			<div className="book-search">
				<div className="input-area">
					<div className="text">ISBN</div>
					<input
							className={`input-isbn${tradeId ? '-readonly' : ''}`}
							placeholder={tradeId ? '' : 'ISBN 번호를 입력하세요'}
							value={ISBN || ''}
							name="isbn"
							onChange={!tradeId ? handleISBNChange : undefined}
							readOnly={tradeId}
					/>
				</div>
				<div className="title-area">
					<div className="input-area">
						<div className="text">도서 제목</div>
						<AutoCompleteInput
								tradeId={tradeId}
								trade={trade}
								dataList={dataList}
								onSelect={handleBookSelect}
								onChange={handleBookNameChange}
								value={valueToDisplay}
						/>
					</div>
				</div>
			</div>
	);
};

export default BookInput;
