import { ReactNode } from "react"
import css from "./MovieModal.module.css"

export default async function MovieLayout({
	children,
	credits,
	recomendations,
	similar,
	pageVideo,
}: //reviews,
//similar,
{
	children: ReactNode
	credits: ReactNode
	recomendations: ReactNode
	similar: ReactNode
	pageVideo: ReactNode
}) {
	return (
		<div className={css.movie__layout}>
			{children}
			{pageVideo}
			{credits}
			{recomendations}
			{similar}
		</div>
	)
}
