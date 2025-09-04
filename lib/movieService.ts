import axios from "axios"
import { TRANDING_URL, DETAILS_URL, adultGenreIds } from "./vars"
import { Movie } from "@/types/movie"

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

export const getMovies = async (url: string, searchParams: SearchParams): Promise<ApiMovieData> => {
	return await getApiData(url, createQueryParams(searchParams))
}

export const getTrandingMovies = async (searchParams: SearchParams): Promise<ApiMovieData> => {
	return await getApiData(TRANDING_URL, createQueryParams(searchParams))
}

export const getMovieById = async (searchParams: SearchParams): Promise<Movie> => {
	return await getApiData(`${DETAILS_URL}${searchParams.movie_id}`, createQueryParams(searchParams))
}

export const getMovieByIdServer = async (id: string, language: string): Promise<Movie> => {
	const qParams: SearchParams = {
		movie_id: Number(id),
		language,
	}

	return await getApiData(`${DETAILS_URL}${qParams.movie_id}`, createQueryParams(qParams))
}

export const isAdultGenre = (genreId: number[], isAdult: boolean): boolean => {
	const isAdultGenre = genreId.some((id) => adultGenreIds.includes(id))
	return isAdult || isAdultGenre
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
