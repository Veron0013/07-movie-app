"use client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "next/navigation"
import { DiscoverFilter, getMoviesDiscover, SearchParams } from "@/lib/movieService"
import { useEffect, useState } from "react"
import { SCROLL_THRESHOLD } from "@/lib/vars"
import toastMessage, { MyToastType } from "@/lib/messageService"
import MovieGrid from "@/components/MovieGrid/MovieGrid"
import ScrollUp from "@/components/ScrollUp/ScrollUp"
import Pagination from "@/components/Pagination/Pagination"
import { useLangStore } from "@/stores/langStore"

const DiscoverClient = () => {
	const { lang } = useParams<{ lang: string }>()

	const searchParams = Object.fromEntries(useSearchParams().entries()) as unknown as DiscoverFilter

	const [currentPage, setCurrentPage] = useState<number>(!searchParams.page ? 1 : searchParams.page)

	const [isScrollUp, setScrollUp] = useState(false)

	const { translationTexts } = useLangStore()

	const qParam: SearchParams = {
		...searchParams,
		language: lang,
		page: currentPage,
	}

	const {
		data,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["Discover", lang, currentPage, searchParams],
		queryFn: () => fetchQueryData(),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	})

	const fetchQueryData = async () => {
		const res = await getMoviesDiscover(qParam)
		if (!res.results.length) {
			toastMessage(MyToastType.error, translationTexts.toast_bad_request)
		}
		return res
	}

	const total_pages: number = data?.total_pages || 0

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
		setScrollUp(false)
	}

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > SCROLL_THRESHOLD) {
				setScrollUp(true)
			} else {
				setScrollUp(false)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<>
			{total_pages > 1 && (
				<Pagination
					currentPage={currentPage}
					total_pages={total_pages}
					setCurrentPage={(newPage: number) => {
						setCurrentPage(newPage)
					}}
				/>
			)}
			{data && data?.results?.length > 0 && <MovieGrid movies={data.results} />}
			{isScrollUp && <ScrollUp onClick={scrollToTop} />}
		</>
	)
}

export default DiscoverClient
