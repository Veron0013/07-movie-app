"use client"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { getMovies, SearchParams } from "@/lib/movieService"
import { useEffect, useState } from "react"
import { SCROLL_THRESHOLD } from "@/lib/vars"
import toastMessage, { MyToastType } from "@/lib/messageService"
import { Toaster } from "react-hot-toast"
import MovieGrid from "@/components/MovieGrid/MovieGrid"
import ScrollUp from "@/components/ScrollUp/ScrollUp"
import Pagination from "@/components/Pagination/Pagination"
import { useLangStore } from "@/stores/langStore"

const SearchClient = () => {
	const { lang } = useParams<{ lang: string }>()
	const searchParams = useSearchParams()

	const router = useRouter()

	const [currentPage, setCurrentPage] = useState<number>(1)

	const [isScrollUp, setScrollUp] = useState(false)

	const { translationTexts } = useLangStore()

	const query = searchParams.get("query") || ""

	const qParam: SearchParams = {
		query,
		language: lang,
		page: currentPage,
	}

	const {
		data,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["Search", lang, query, currentPage],
		queryFn: () => getMovies(qParam),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	})

	const total_pages: number = data?.total_pages || 0

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
		setScrollUp(false)
	}

	const handleClick = async (movie_id: number) => {
		console.log("first", movie_id)
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

	useEffect(() => {
		if (total_pages === 0) {
			toastMessage(MyToastType.error, translationTexts.toast_bad_request)
			setTimeout(() => {
				router.push(`/${lang}`)
			}, 2000)
		}
	}, [total_pages])

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
			{data && data?.results?.length > 0 && <MovieGrid movies={data.results} onSelect={handleClick} />}
			{isScrollUp && <ScrollUp onClick={scrollToTop} />}
		</>
	)
}

export default SearchClient
