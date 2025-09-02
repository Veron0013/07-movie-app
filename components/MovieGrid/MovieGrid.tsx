import { isAdultGenre } from "../../services/movieService"
import { type Movie } from "../../types/movie"
import { ADULT_ALERT, NO_IMAGE, PIC_URL } from "../../services/vars"
import css from "./MovieGrid.module.css"
import { useLanguage } from "../LanguageContext/LanguageContext"

interface MovieGridProps {
	onSelect: (movieId: number) => void
	movies: Movie[]
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
	const { translationTexts } = useLanguage()

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
					const hasRating: boolean = item.vote_average > 0 || false
					const picSource: string = item.poster_path !== null ? `${PIC_URL}${item.poster_path}` : NO_IMAGE
					const releaseYear: string =
						item.release_date.length > 4 ? `${item.release_date.slice(0, 4)} ${translationTexts.desc_year}` : ``

					return (
						<li
							key={item.id}
							id={item.id.toString()}
							onClick={handleClick}
							style={{ animationDelay: `${index * 100}ms` }}
						>
							<div className={css.card}>
								<img className={css.image} src={picSource} alt={item.title} loading="lazy" />
								<h2 className={css.title}>
									{item.title}
									<p className={css.year_description}>{releaseYear}</p>
								</h2>
								{showAdultBadge && <img className={css.adult} src={ADULT_ALERT} alt="18+ Alert" loading="lazy" />}
								{hasRating && <div className={css.rating}>{item.vote_average?.toFixed(2)}</div>}
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
