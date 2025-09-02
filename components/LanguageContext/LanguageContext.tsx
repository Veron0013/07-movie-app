import { createContext, useContext } from "react"
import { translations } from "../../services/translation"
import type { LangType, TranslationKeys } from "../../types/translationKeys"
import { useLocalStorage } from "@uidotdev/usehooks"

type LangContextType = {
	language: string
	setLanguage: (lang: LangType) => void
	translationTexts: TranslationKeys
}

const LanguageContext = createContext<LangContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
	const [language, setLanguage] = useLocalStorage<LangType>("sysLang", "en-US")

	//const changeLanguage = (lang: LangType) => {
	//	setStorageLang(lang)
	//}

	//const [language, setLanguage] = useState<LangType>(sysLang || "en-US")
	const translationTexts = translations[language]
	return (
		<LanguageContext.Provider value={{ language, setLanguage, translationTexts }}>{children}</LanguageContext.Provider>
	)
}

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	//console.log(context)
	if (!context) throw new Error("useLanguage must be used within LanguageProvider")
	return context
}
