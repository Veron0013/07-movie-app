import { Movie } from "@/types/movie"
import css from "./MovieGrid.module.css"
import { isAdultGenre } from "@/lib/movieService"
import { ADULT_ALERT, NO_IMAGE, PIC_URL } from "@/lib/vars"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useLangStore } from "@/stores/langStore"
import MovieRating from "./MovieRating"

interface MovieGridProps {
	onSelect: (movieId: number) => void
	movies: Movie[]
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
	const { translationTexts } = useLangStore()

	const { lang } = useParams<{ lang: string }>()

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const movie_id: number = Number(e.currentTarget.id)
		return onSelect(movie_id)
	}
	return (
		<div>
			<ul className={css.grid}>
				{movies.map((item: Movie, index: number) => {
					//console.log(item)
					const showAdultBadge = item.genre_ids ? isAdultGenre(item.genre_ids, item.adult || false) : false
					const filmRating: number = item.vote_average > 0 ? item.vote_average * 10 : 0
					const picSource: string = item.poster_path !== null ? `${PIC_URL}${item.poster_path}` : NO_IMAGE
					//const releaseYear: string =
					//	item.release_date.length > 4 ? `${item.release_date.slice(0, 4)} ${translationTexts.desc_year}` : ``
					const releaseYear: string = item.release_date

					return (
						<li
							key={item.id}
							id={item.id.toString()}
							onClick={handleClick}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<Link href={`/${lang}/movie/${item.id}`}>
								<div className={css.card}>
									<Image
										className={css.image}
										src={picSource}
										alt={item.title}
										loading="lazy"
										width={640}
										height={480}
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
								</div>
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
