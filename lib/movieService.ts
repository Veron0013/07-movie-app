import axios from "axios"
import { TRANDING_URL, DETAILS_URL, adultGenreIds, SEARCH_URL, DISCOVER_URL } from "./vars"
import { Cast, CastData, Movie, SortOption } from "@/types/movie"

export interface SearchParams {
	include_adult?: boolean
	language?: string
	include_image_language?: string
	page?: number
	query?: string
	year?: number
	movie_id?: number
}

export interface ApiMovieData {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

interface ApiQueryParams {
	headers: {
		accept: "application/json"
		Authorization: string
	}
	params: SearchParams
}

export interface DiscoverFilter {
	include_adult?: boolean
	include_video?: boolean
	language: string // наприклад "en-US"
	page: number
	primary_release_year?: number
	primary_release_date_gte?: string // формат: YYYY-MM-DD
	primary_release_date_lte?: string // формат: YYYY-MM-DD
	region?: string
	release_date_gte?: string // формат: YYYY-MM-DD
	release_date_lte?: string // формат: YYYY-MM-DD
	sort_by?: SortOption
	vote_average_gte?: number
	vote_average_lte?: number
	vote_count_gte?: number
	vote_count_lte?: number
	watch_region?: string
	with_cast?: string
	with_companies?: string
	with_crew?: string
	with_genres?: string
	with_keywords?: string
	with_origin_country?: string
	with_original_language?: string
	with_people?: string
	with_release_type?: number // 1–6
	with_runtime_gte?: number
	with_runtime_lte?: number
	with_watch_providers?: string
	without_companies?: string
	without_genres?: string
	without_keywords?: string
	without_watch_providers?: string
	year?: number
}

export const getMovies = async (searchParams: SearchParams): Promise<ApiMovieData> => {
	return await getApiData(SEARCH_URL, createQueryParams(searchParams))
}

export const getTrandingMovies = async (searchParams: SearchParams): Promise<ApiMovieData> => {
	return await getApiData(TRANDING_URL, createQueryParams(searchParams))
}

export const getMovieById = async (searchParams: SearchParams): Promise<Movie> => {
	return await getApiData(`${DETAILS_URL}${searchParams.movie_id}`, createQueryParams(searchParams))
}

export const getMovieByIdServer = async (id: string, language: string, subPath = ""): Promise<Movie> => {
	const qParams: SearchParams = {
		movie_id: Number(id),
		language,
	}
	return await getApiData(`${DETAILS_URL}${qParams.movie_id}${subPath}`, createQueryParams(qParams))
}

export const getMovieByIdCast = async (id: string, language: string, subPath = ""): Promise<Cast[]> => {
	const qParams: SearchParams = {
		movie_id: Number(id),
		language,
	}
	const response: CastData = await getApiData(`${DETAILS_URL}${qParams.movie_id}${subPath}`, createQueryParams(qParams))
	return response.cast
}

export const getMovieByIdRecomendations = async (id: string, language: string, subPath = ""): Promise<Movie[]> => {
	const qParams: SearchParams = {
		movie_id: Number(id),
		language,
	}
	const response: ApiMovieData = await getApiData(
		`${DETAILS_URL}${qParams.movie_id}${subPath}`,
		createQueryParams(qParams)
	)
	return response.results
}

export const isAdultGenre = (genreId: number[], isAdult: boolean): boolean => {
	const isAdultGenre = genreId.some((id) => adultGenreIds.includes(id))
	return isAdult || isAdultGenre
}

export const getMoviesDiscover = async (searchParams: SearchParams): Promise<ApiMovieData> => {
	return await getApiData(DISCOVER_URL, createQueryParams(searchParams))
}

const createQueryParams = (searchParams: SearchParams): ApiQueryParams => ({
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
	},
	params: { ...searchParams },
})

const getApiData = async <T>(url: string, queryParams: ApiQueryParams): Promise<T> => {
	const response = await axios.get<T>(url, queryParams)
	return response.data
}
