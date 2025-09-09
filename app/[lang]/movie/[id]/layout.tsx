import { ReactNode } from "react"
import css from "./MovieModal.module.css"

export default async function MovieLayout({
	children,
	credits,
	recomendations,
	similar,
}: //reviews,
//similar,
{
	children: ReactNode
	credits: ReactNode
	recomendations: ReactNode
	similar: ReactNode
}) {
	return (
		<div className={css.movie__layout}>
			<div>{children}</div>
			<div>{credits}</div>
			<div>{recomendations}</div>
			<div>{similar}</div>
		</div>
	)
}
