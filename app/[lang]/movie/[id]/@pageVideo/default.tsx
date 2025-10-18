"use client"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import css from "../@credits/MovieCredits.module.css"

import { getMovieByIdVideo } from "@/lib/movieService"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useLangStore } from "@/stores/langStore"
import { Video } from "@/types/movie"

export default function PageVideo() {
	const { lang, id } = useParams<{ lang: string; id: string }>()
	const { translationTexts } = useLangStore()
	const {
		data: videos,
		//isLoading,
		//error,
	} = useQuery({
		queryKey: ["FilmDetailsVideo", id, lang],
		queryFn: () => getMovieByIdVideo(id, lang),
		refetchOnMount: true,
	})

	if (!videos?.length) {
		return null
	}

	return (
		<div className={css.grid__container}>
			<h2 className={css.slot__title}>{translationTexts.video}</h2>
			<ul className={css.grid}>
				{videos.map((item: Video, index: number) => {
					//console.log(item)
					return (
						<li key={item.id} id={item.id.toString()} style={{ animationDelay: `${index * 100}ms` }}>
							<div className={css.video_card}>
								{/*<div>*/}
								<LiteYouTubeEmbed id={item.key} title={item.name} />
							</div>
							<div>
								<p>{item.name}</p>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
