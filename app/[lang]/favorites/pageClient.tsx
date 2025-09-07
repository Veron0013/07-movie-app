"use client"
import { useParams } from "next/navigation"
import { getMovieByIdServer } from "@/lib/movieService"
import { useEffect, useState } from "react"
import { SCROLL_THRESHOLD } from "@/lib/vars"
//import toastMessage, { MyToastType } from "@/lib/messageService"
import { Toaster } from "react-hot-toast"
import MovieGrid from "@/components/MovieGrid/MovieGrid"
import ScrollUp from "@/components/ScrollUp/ScrollUp"
import { useFavoriteStore } from "@/stores/favoritesStore"
import { Movie } from "@/types/movie"
//import { useLangStore } from "@/stores/langStore"

const FavoritesClient = () => {
	const { lang } = useParams<{ lang: string }>()
	const { favorites } = useFavoriteStore()
	console.log(favorites)
	const [data, setData] = useState<Movie[]>([])
	const [isScrollUp, setScrollUp] = useState(false)

	const mylist = async () => {
		const movies: Movie[] = []
		for (const movieId of favorites) {
			try {
				const movie = await getMovieByIdServer(String(movieId), lang)
				movies.push(movie)
			} catch {
				continue
			}
		}
		console.log(movies)
		setData(movies)
	}

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" })
		setScrollUp(false)
	}

	useEffect(() => {
		const handleScroll = () => {
			setScrollUp(window.scrollY > SCROLL_THRESHOLD)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	useEffect(() => {
		if (favorites.length > 0) {
			mylist()
		}
	}, [lang])

	return (
		<>
			<Toaster />
			{data.length > 0 && <MovieGrid movies={data} />}
			{isScrollUp && <ScrollUp onClick={scrollToTop} />}
		</>
	)
}

export default FavoritesClient
