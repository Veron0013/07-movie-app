import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getMovies, SearchParams } from "@/lib/movieService"
import { Metadata } from "next"
import FavoritesClient from "./pageClient"

//type Props = {
//	params: Promise<{ lang: string }>
//	searchParams: Promise<{ query: string }>
//}

export async function generateMetadata(): Promise<Metadata> {
	//const search = searchParams ? await searchParams : { query: "no data" }
	//const query = search.query || "no data"
	return {
		title: `Favorites | My Movie App`,
		description: `List of favorites movies`,
		openGraph: {
			title: `Favorites | My Movie App`,
			description: `List of favorites movies`,
			images: [
				`https://cdn.readme.io/og-image/create?type=reference&title=Search%20-%20Movies&projectTitle=The%20Movie%20Database&description=Search%20for%20movies%20by%20their%20original%2C%20translated%20and%20alternative%20titles.&logoUrl=https%3A%2F%2Ffiles.readme.io%2F29c6fee-blue_short.svg&color=%230d253f`,
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `Favorites | My Movie App`,
			description: `List of favorites movies`,
			images: [
				`https://cdn.readme.io/og-image/create?type=reference&title=Search%20-%20Movies&projectTitle=The%20Movie%20Database&description=Search%20for%20movies%20by%20their%20original%2C%20translated%20and%20alternative%20titles.&logoUrl=https%3A%2F%2Ffiles.readme.io%2F29c6fee-blue_short.svg&color=%230d253f`,
			],
		},
	}
}

const FavoritesPage = async () => {
	//const { lang } = await params
	//const search = searchParams ? await searchParams : { query: "no data" }
	//const query = search.query || "no data"

	//const queryClient = new QueryClient()

	//const qParam: SearchParams = {
	//	query,
	//	language: lang,
	//	page: 1,
	//}

	//await queryClient.prefetchQuery({
	//	queryKey: ["Search", lang, query],
	//	queryFn: () => getMovies(qParam),
	//})

	return (
		//<HydrationBoundary state={dehydrate(queryClient)}>
		<FavoritesClient />
		//</HydrationBoundary>
	)
}

export default FavoritesPage
