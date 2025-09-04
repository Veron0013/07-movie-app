import { create } from "zustand"
import { persist } from "zustand/middleware"
import { translations } from "@/lib/translation"
import type { LangType, TranslationKeys } from "@/types/translationKeys"

type LangStore = {
	lang: LangType
	translationTexts: TranslationKeys
	changeLang: (newLang: LangType) => void
}

export const useLangStore = create<LangStore>()(
	persist(
		(set) => ({
			lang: "en-US" as LangType,
			translationTexts: translations["en-US"],
			changeLang: (newLang: LangType) =>
				set({
					lang: newLang,
					translationTexts: translations[newLang],
				}),
		}),
		{
			name: "app-lang",
		}
	)
)
