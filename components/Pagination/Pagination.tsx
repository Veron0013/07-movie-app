import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"

interface PaginationProps {
	setCurrentPage: (newPage: number) => void
	total_pages: number
	currentPage: number
}

export default function Pagination({ setCurrentPage, total_pages, currentPage }: PaginationProps) {
	return (
		<>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={({ selected }) => {
					setCurrentPage(selected + 1)
				}}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={total_pages}
				forcePage={currentPage - 1}
				containerClassName={css.pagination}
				activeClassName={css.active}
			/>
		</>
	)
}
