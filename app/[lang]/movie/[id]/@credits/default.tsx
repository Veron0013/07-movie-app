"use client"
import { getMovieByIdCast } from "@/lib/movieService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import Image from "next/image"
import { NO_IMAGE, PIC_URL } from "@/lib/vars"
import css from "./MovieCredits.module.css"
import { useLangStore } from "@/stores/langStore"

export default function Credits() {
	const { lang, id } = useParams<{ lang: string; id: string }>()
	const { translationTexts } = useLangStore()
	const {
		data: cast,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["FilmDetails", id, lang],
		queryFn: () => getMovieByIdCast(id, lang, "/credits"),
		refetchOnMount: true,
	})

	return (
		<div className={css.grid__container}>
			<h2 className={css.slot__title}>{translationTexts.cast}</h2>
			{cast && cast?.length > 1 && (
				<ul className={css.grid}>
					{cast.map((item, index) => {
						const picSource = item.profile_path ? `${PIC_URL}${item.profile_path}` : NO_IMAGE
						return (
							<li key={`cast-${item.id}`} id={item.id.toString()} style={{ animationDelay: `${index * 100}ms` }}>
								<Image className={css.image} src={picSource} alt={item.name} loading="lazy" width={240} height={380} />
								<div>
									<p>{`${item.original_name} / ${item.name}`}</p>
									<p>{item.character}</p>
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
