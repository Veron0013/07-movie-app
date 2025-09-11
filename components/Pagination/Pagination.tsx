"use client"
import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface PaginationProps {
	setCurrentPage: (newPage: number) => void
	total_pages: number
	currentPage: number
}

export default function Pagination({ setCurrentPage, total_pages, currentPage }: PaginationProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const handlePageChange = (pageNum: number) => {
		const segments = pathname.split("/")
		const params = new URLSearchParams(searchParams.toString())

		params.set("page", String(pageNum))

		setCurrentPage(pageNum)
		router.push(`${segments.join("/")}${params.size ? "?" + params.toString() : ""}`)
	}

	//console.log(params)
	return (
		<>
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				previousLabel="<"
				onPageChange={({ selected }) => handlePageChange(selected + 1)}
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
