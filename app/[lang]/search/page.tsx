import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getMovies, SearchParams } from "@/lib/movieService"
import { Metadata } from "next"
import SearchClient from "./pageClient"

type Props = {
	params: Promise<{ lang: string }>
	searchParams: Promise<{ query: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	const search = searchParams ? await searchParams : { query: "no data" }
	const query = search.query || "no data"
	return {
		title: `Search: ${query} | My Movie App`,
		description: `Searching: ${query} getting details and information`,
		openGraph: {
			title: `Search: ${query}`,
			description: `Searching: ${query} getting details and information`,
			images: [
				`https://cdn.readme.io/og-image/create?type=reference&title=Search%20-%20Movies&projectTitle=The%20Movie%20Database&description=Search%20for%20movies%20by%20their%20original%2C%20translated%20and%20alternative%20titles.&logoUrl=https%3A%2F%2Ffiles.readme.io%2F29c6fee-blue_short.svg&color=%230d253f`,
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `Search: ${query}`,
			description: `Searching: ${query} getting details and information`,
			images: [
				`https://cdn.readme.io/og-image/create?type=reference&title=Search%20-%20Movies&projectTitle=The%20Movie%20Database&description=Search%20for%20movies%20by%20their%20original%2C%20translated%20and%20alternative%20titles.&logoUrl=https%3A%2F%2Ffiles.readme.io%2F29c6fee-blue_short.svg&color=%230d253f`,
			],
		},
	}
}

const SearchPage = async ({ params, searchParams }: Props) => {
	const { lang } = await params
	const search = searchParams ? await searchParams : { query: "no data" }
	const query = search.query || "no data"

	const queryClient = new QueryClient()

	const qParam: SearchParams = {
		query,
		language: lang,
		page: 1,
	}

	await queryClient.prefetchQuery({
		queryKey: ["Search", lang, query],
		queryFn: () => getMovies(qParam),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SearchClient />
		</HydrationBoundary>
	)
}

export default SearchPage
