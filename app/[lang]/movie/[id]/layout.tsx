import { ReactNode } from "react"
import css from "./MovieModal.module.css"

export default async function MovieLayout({
	children,
	credits,
}: //reviews,
//similar,
{
	children: ReactNode
	credits: ReactNode
	//reviews: ReactNode
	//similar: ReactNode
}) {
	return (
		<div className={css.movie__layout}>
			<div>{children}</div>
			<div>{credits}</div>
			{/*<div>{reviews}</div>
			<div>{similar}</div>*/}
		</div>
	)
}
