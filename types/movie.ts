export interface Movie {
	adult?: boolean // за замовчуванням true
	backdrop_path: string
	genre_ids?: number[]
	id: number // за замовчуванням 0
	original_language?: string
	original_title?: string
	overview: string
	popularity?: number // за замовчуванням 0
	poster_path: string
	release_date: string
	title: string
	video?: boolean // за замовчуванням true
	vote_average: number // за замовчуванням 0
	vote_count: number // за замовчуванням 0
	belongs_to_collection?: object | null
	budget?: number
	genres?: { id: number; name: string }[]
	homepage?: string
	imdb_id?: string
	production_companies?: {
		id: number
		logo_path: string | null
		name: string
		origin_country: string
	}[]
	production_countries?: {
		iso_3166_1: string
		name: string
	}[]
	revenue?: number
	runtime?: number
	spoken_languages?: {
		iso_639_1: string
		name: string
	}[]
	status?: string
	tagline?: string
	media_type?: string
}

//sort option
export enum SortOption {
	ORIGINAL_TITLE_ASC = "original_title.asc",
	ORIGINAL_TITLE_DESC = "original_title.desc",
	POPULARITY_ASC = "popularity.asc",
	POPULARITY_DESC = "popularity.desc",
	REVENUE_ASC = "revenue.asc",
	REVENUE_DESC = "revenue.desc",
	PRIMARY_RELEASE_DATE_ASC = "primary_release_date.asc",
	PRIMARY_RELEASE_DATE_DESC = "primary_release_date.desc",
	TITLE_ASC = "title.asc",
	TITLE_DESC = "title.desc",
	VOTE_AVERAGE_ASC = "vote_average.asc",
	VOTE_AVERAGE_DESC = "vote_average.desc",
	VOTE_COUNT_ASC = "vote_count.asc",
	VOTE_COUNT_DESC = "vote_count.desc",
}

export interface Cast {
	adult: boolean // Defaults to true
	gender: number // integer, Defaults to 0
	id: number // integer, Defaults to 0
	known_for_department: string
	name: string
	original_name: string
	popularity: number // Defaults to 0
	profile_path: string
	character: string
	credit_id: string
	order: number // integer, Defaults to 0
}

export interface CastData {
	id: number
	cast: Cast[]
	crew: []
}
