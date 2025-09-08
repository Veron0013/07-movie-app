import { LangType } from "@/types/translationKeys"
import { create } from "zustand"

type PaginationStore = {
	pages: Record<LangType, number>
	setPage: (newLang: LangType, newPage: number) => void
}

export const usePaginationStore = create<PaginationStore>((set) => ({
	pages: {} as Record<LangType, number>, // початково порожня мапа
	setPage: (lang, page) =>
		set((state) => ({
			pages: { ...state.pages, [lang]: page },
		})),
}))
