"use client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { getTrandingMovies, SearchParams } from "@/lib/movieService"
import { useEffect, useState } from "react"
import { SCROLL_THRESHOLD } from "@/lib/vars"
import toastMessage, { MyToastType } from "@/lib/messageService"
import { Toaster } from "react-hot-toast"
import MovieGrid from "@/components/MovieGrid/MovieGrid"
import ScrollUp from "@/components/ScrollUp/ScrollUp"
import Pagination from "@/components/Pagination/Pagination"
import { useLangStore } from "@/stores/langStore"

const HomeClient = () => {
	const { lang } = useParams<{ lang: string }>()

	const [currentPage, setCurrentPage] = useState<number>(1)

	const [isScrollUp, setScrollUp] = useState(false)

	const { translationTexts } = useLangStore()

	const qParam: SearchParams = {
		language: lang,
		page: currentPage,
	}

	const {
		data,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["Tranding", lang, currentPage],
		queryFn: () => fetchQueryData(),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	})

	const fetchQueryData = async () => {
		const res = await getTrandingMovies(qParam)
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
			<Toaster />
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

export default HomeClient
