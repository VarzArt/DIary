import React from 'react';
import { usePagination } from '../../../hooks/usePagination';
import '../../../styles/Pagination.css'

const Pagination = ({totalPages, page, changePage}) => {

	const pagesArray = usePagination(totalPages);
	return (
		<div className="pagination">
		{pagesArray.map((p) => (
			<button
				className={
					page === p
						? "pagination__item pagination__item_current"
						: "pagination__item"
				}
				key={p}
				onClick= {() => changePage(p)}
			>
				{p}
			</button>
		))}
	</div>
	);
}

export default Pagination;
