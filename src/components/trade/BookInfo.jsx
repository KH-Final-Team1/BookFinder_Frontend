import React from 'react';

export default function BookInfo({ trade, book }) {
	return (
			<div>
				<div className="book-info">
					{(book || (trade && trade.book)) && (
							<div className="book-img">
								<img src={trade && trade.book ? trade.book.imageUrl : book.imageUrl} alt={trade && trade.book ? trade.book.title : book.title} />
							</div>
					)}
					<div className="book-details">
						<dl className="book-class">
							<dt>주제 분류</dt>
							<dd>{trade ? trade.book.className : book.className}</dd>
						</dl>
						<dl className="book-author">
							<dt>저자</dt>
							<dd>{trade ? trade.book.authors : book.authors}</dd>
						</dl>
						<dl className="book-publisher">
							<dt>출판사</dt>
							<dd>{trade ? trade.book.publisher : book.publisher}</dd>
						</dl>
						<dl className="book-publication-year">
							<dt>발행일</dt>
							<dd>{trade ? trade.book.publicationYear : book.publicationYear}</dd>
						</dl>
					</div>
				</div>
				<hr />
			</div>
	);
}