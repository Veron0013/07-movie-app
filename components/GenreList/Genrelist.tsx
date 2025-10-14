import { Genre } from "@/types/movie"
import css from "./GenreList.module.css"

interface GenreProps {
	genres: Genre[]
	listClass: string
}

function Genrelist({ genres, listClass }: GenreProps) {
	return (
		<div>
			{genres.map((item: Genre) => {
				return (
					<li key={item.id} className={css[listClass ? listClass : "footer"]}>
						{item.name}
					</li>
				)
			})}
		</div>
	)
}

export default Genrelist
