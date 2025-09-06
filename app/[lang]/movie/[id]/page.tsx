import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query"
import FilmDetailsClient from "./FilmDetailsClient"
import { getMovieByIdServer } from "@/lib/movieService"
import { Metadata } from "next"

type Props = {
	params: Promise<{ lang: string; id: string }>
}

async function fetchMovie(id: string, lang: string, queryClient?: QueryClient) {
	const movie = await getMovieByIdServer(id, lang)

	if (queryClient) {
		await queryClient.prefetchQuery({
			queryKey: ["FilmById", id, lang],
			queryFn: () => Promise.resolve(movie),
		})
	}

	return movie
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id, lang } = await params
	const movie = await fetchMovie(id, lang)

	return {
		title: movie?.title ? `${movie.title} | My Movie App` : "Movie details",
		description: movie?.overview ?? "Movie details and information",
		openGraph: {
			title: movie?.title,
			description: movie?.overview,
			images: movie?.backdrop_path ? [`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: movie?.title,
			description: movie?.overview,
			images: movie?.poster_path ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`] : [],
		},
	}
}

const NoteDetails = async ({ params }: Props) => {
	const { id, lang } = await params
	const queryClient = new QueryClient()

	await fetchMovie(id, lang, queryClient)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FilmDetailsClient />
		</HydrationBoundary>
	)
}

export default NoteDetails
