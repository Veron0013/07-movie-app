import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { DiscoverFilter, getMoviesDiscover, SearchParams } from "@/lib/movieService"
import DiscoverClient from "./pageClient"

type Props = {
	params: Promise<{ lang: string }>
	searchParams: Promise<DiscoverFilter>
}

const DiscoverPage = async ({ params, searchParams }: Props) => {
	const search = searchParams ? await searchParams : {}
	const { lang } = await params

	const queryClient = new QueryClient()

	const qParam: SearchParams = {
		...search,
		language: lang,
		page: 1,
	}

	await queryClient.prefetchQuery({
		queryKey: ["Discover", lang, search],
		queryFn: () => getMoviesDiscover(qParam),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<DiscoverClient />
		</HydrationBoundary>
	)
}

export default DiscoverPage
