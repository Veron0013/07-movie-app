"use client"
import { getMovieByIdRecomendations, isAdultGenre } from "@/lib/movieService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ADULT_ALERT, NO_IMAGE, PIC_URL } from "@/lib/vars"
import css from "../@credits/MovieCredits.module.css"
import { useLangStore } from "@/stores/langStore"
import { Movie } from "@/types/movie"
import Link from "next/link"
import Favorites from "@/components/Favorites/Favorites"
import MovieRating from "@/components/MovieGrid/MovieRating"

export default function Similar() {
	const { lang, id } = useParams<{ lang: string; id: string }>()
	const { translationTexts } = useLangStore()
	const {
		data: movies,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["FilmDetailsSimilar", id, lang],
		queryFn: () => getMovieByIdRecomendations(id, lang, "/similar"),
		refetchOnMount: true,
	})

	if (!movies?.length) return null

	return (
		<div className={css.grid__container}>
			<h2 className={css.slot__title}>{translationTexts.similar}</h2>
			<ul className={css.grid}>
				{movies.map((item: Movie, index: number) => {
					//console.log(item)
					const showAdultBadge = item.genre_ids ? isAdultGenre(item.genre_ids, item.adult || false) : false
					const filmRating: number = item.vote_average > 0 ? item.vote_average * 10 : 0
					const picSource: string = item.poster_path !== null ? `${PIC_URL}${item.poster_path}` : NO_IMAGE
					const releaseYear: string =
						item.release_date && item.release_date.length > 4
							? `${item.release_date.slice(0, 4)} ${translationTexts.desc_year}`
							: ``

					return (
						<li key={item.id} id={item.id.toString()} style={{ animationDelay: `${index * 100}ms` }}>
							<Link href={`/${lang}/movie/${item.id}`}>
								<div className={css.card}>
									<Image
										className={css.image}
										src={picSource}
										alt={item.title}
										loading="lazy"
										fill
										sizes="(max-width: 768px) 100%, 
										(min-width: 768px) 100%"
									/>
									<h2 className={css.title}>
										{item.title}
										<p className={css.year_description}>{releaseYear}</p>
									</h2>
									{showAdultBadge && (
										<Image
											className={css.adult}
											src={ADULT_ALERT}
											alt="18+ Alert"
											loading="lazy"
											width={60}
											height={60}
										/>
									)}
									<MovieRating percentage={filmRating} />
									<Favorites movieId={item.id} />
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
