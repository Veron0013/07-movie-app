"use client"
import { useFavoriteStore } from "@/stores/favoritesStore"
import { GrFavorite } from "react-icons/gr"
import css from "./Favorites.module.css"

interface FavoritesProps {
	movieId: number
}

export default function Favorites({ movieId }: FavoritesProps) {
	const { toggleFavorite, isFavorite } = useFavoriteStore()

	const handleFavoriteClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		toggleFavorite(movieId)
	}

	const heartColor: string = isFavorite(movieId) ? "gold" : "black"
	const borderColor: string = isFavorite(movieId) ? "black" : "gold"

	return (
		<div className={css.favorites__container} onClick={handleFavoriteClick}>
			<div>
				<GrFavorite
					size={36}
					color={heartColor}
					style={{
						cursor: "pointer",
						filter: `drop-shadow(1px 1px 0px ${borderColor})`,
					}}
				/>
			</div>
		</div>
	)
}
