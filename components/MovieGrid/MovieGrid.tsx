import { Movie } from "@/types/movie"
import css from "./MovieGrid.module.css"
import { isAdultGenre } from "@/lib/movieService"
import { ADULT_ALERT, NO_IMAGE, PIC_URL } from "@/lib/vars"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useLangStore } from "@/stores/langStore"
import MovieRating from "./MovieRating"
import Favorites from "../Favorites/Favorites"

interface MovieGridProps {
	//onSelect: (movieId: number) => void
	movies: Movie[]
}

export default function MovieGrid({ movies }: MovieGridProps) {
	const { translationTexts } = useLangStore()

	const { lang } = useParams<{ lang: string }>()

	//const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
	//	if ((e.target as HTMLElement).closest(`.favorites__container`)) return

	//	const movie_id: number = Number(e.currentTarget.id)
	//	return onSelect(movie_id)
	//}
	return (
		<>
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
		</>
	)
}
