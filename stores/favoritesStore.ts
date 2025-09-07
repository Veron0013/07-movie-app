import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoriteStore {
	favorites: number[]
	addFavorite: (id: number) => void
	removeFavorite: (id: number) => void
	toggleFavorite: (id: number) => void
	isFavorite: (id: number) => boolean
}

export const useFavoriteStore = create<FavoriteStore>()(
	persist(
		(set, get) => ({
			favorites: [],

			addFavorite: (id) =>
				set((state) => ({
					favorites: state.favorites.includes(id) ? state.favorites : [...state.favorites, id],
				})),

			removeFavorite: (id) =>
				set((state) => ({
					favorites: state.favorites.filter((f) => f !== id),
				})),

			toggleFavorite: (id) => {
				const isFav = get().favorites.includes(id)
				if (isFav) get().removeFavorite(id)
				else get().addFavorite(id)
			},

			isFavorite: (id) => get().favorites.includes(id),
		}),
		{
			name: "favorites-storage",
		}
	)
)
