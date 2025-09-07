"use client"
import css from "./MovieModal.module.css"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { PIC_URL, FLAG_URL, ADULT_ALERT, NO_IMAGE } from "@/lib/vars"
import { getMovieByIdServer, isAdultGenre } from "@/lib/movieService"
import { useLangStore } from "@/stores/langStore"

const FilmDetailsClient = () => {
	const { lang, id } = useParams<{ lang: string; id: string }>()
	const {
		data: movie,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["FilmById", id, lang],
		queryFn: () => getMovieByIdServer(id, lang),
		refetchOnMount: true,
	})

	if (movie === undefined) throw new Error()
	//lang flag
	const locale = new Intl.Locale(movie.original_language as string)
	const maximizedLocale = locale.maximize()

	const originalLanguage: string = !maximizedLocale.region ? "US" : maximizedLocale.region.toLocaleUpperCase()

	//18+
	const showAdultBadge: boolean = isAdultGenre(movie.genres?.map((g) => g.id) ?? [], movie.adult ?? false)

	//no image
	const backdropPath: string =
		movie.backdrop_path || movie.poster_path ? PIC_URL + (movie.backdrop_path ?? movie.poster_path) : NO_IMAGE

	//show producers
	const showProduction: boolean = movie.production_companies !== undefined && movie.production_companies.length > 0

	// title
	const movieTitle: string =
		movie.title === movie.original_title ? movie.title : `${movie.title} (${movie.original_title})`

	const formatDigits = (num: number): string => {
		const formatted = new Intl.NumberFormat("fr-FR", {
			style: "decimal",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(num)

		return `$ ${formatted}`
	}

	const { translationTexts } = useLangStore()

	//console.log(movie, movie.production_companies?.length)

	return (
		<>
			{movie && (
				<div className={css.modal}>
					{showAdultBadge && <Image src={ADULT_ALERT} alt="18+ Alert" className={css.adult} width={40} height={40} />}
					<Image src={backdropPath} alt={movie.title} className={css.image} width={1440} height={800} />
					<div className={css.content}>
						<h2>{movieTitle}</h2>
						<p className={css.overview}>{movie.overview}</p>
						<div className={css.content_wrapper}>
							<div className={css.movie}>
								<p>
									<strong>{translationTexts.genres}: </strong>
									{!movie.genres?.length ? "Not described" : movie.genres?.map((g) => g.name).join(", ")}
								</p>
								<p>
									<strong>{translationTexts.releaseDate}:</strong> {movie.release_date}
								</p>
								<p>
									<strong>{translationTexts.originalLanguage}: </strong>
									<Image
										alt={movie.original_language || "original language"}
										title={movie.original_language}
										src={`${FLAG_URL}${originalLanguage}.svg`}
										width={30}
										height={20}
									/>
								</p>
								<p>
									<strong>{translationTexts.budget}: </strong>
									{movie.budget && movie.budget > 0 ? formatDigits(movie.budget) : translationTexts.noBudget}
								</p>
								<p>
									<strong>{translationTexts.revenue}: </strong>
									{movie.revenue && movie.revenue > 0 ? formatDigits(movie.revenue) : translationTexts.noRevenue}
								</p>
								<p>
									<strong>{translationTexts.rating}: </strong> {movie.vote_average?.toFixed(2)}
								</p>
								<p>
									<strong>{translationTexts.popularity}: </strong> {movie.popularity?.toFixed(2)}
								</p>
								<p>
									<strong>{translationTexts.votes}: </strong> {movie.vote_count?.toFixed(2)}
								</p>
							</div>
							{showProduction && (
								<div className={css.movie}>
									<strong>{translationTexts.production}:</strong>
									<ul className={css.production_companies}>
										{movie.production_companies?.map((el) => (
											<li key={el.id}>
												{el.logo_path && (
													<Image
														className={css.logo_path}
														src={`${PIC_URL}${el.logo_path}`}
														alt={el.name}
														width={40}
														height={30}
													/>
												)}
												<p>{el.name}</p>
												<Image
													alt={el.origin_country}
													src={`${FLAG_URL}${el.origin_country}.svg`}
													width={30}
													height={20}
												/>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FilmDetailsClient
