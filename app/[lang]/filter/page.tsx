import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getTrandingMovies, SearchParams } from "@/lib/movieService"
import FilterClient from "./pageClient"

type Props = {
	params: Promise<{ lang: string }>
}

const FilterPage = async ({ params }: Props) => {
	const { lang } = await params

	const queryClient = new QueryClient()

	const qParam: SearchParams = {
		language: lang,
		page: 1,
	}

	await queryClient.prefetchQuery({
		queryKey: ["Tranding", lang],
		queryFn: () => getTrandingMovies(qParam),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<FilterClient />
		</HydrationBoundary>
	)
}

export default FilterPage
