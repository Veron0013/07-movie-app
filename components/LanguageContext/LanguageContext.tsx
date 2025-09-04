//"use client"

//import { createContext, useContext } from "react"
//import type { LangType, TranslationKeys } from "../../types/translationKeys"
//import { useLocalStorage } from "usehooks-ts"
//import { useLangStore } from "@/stores/langStore"

//type LangContextType = {
//	language: string
//	setLanguage: (lang: LangType) => void
//	translationTexts: TranslationKeys
//}

//const LanguageContext = createContext<LangContextType | undefined>(undefined)

//export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
//	const [language, setLanguage] = useLocalStorage<LangType>("sysLang", "en-US")

//	const { translationTexts } = useLangStore()

//	//const changeLanguage = (lang: LangType) => {
//	//	setStorageLang(lang)
//	//}

//	//const [language, setLanguage] = useState<LangType>(sysLang || "en-US")
//	//const translationTexts = translations[lang as LangType]
//	return (
//		<LanguageContext.Provider value={{ language, setLanguage, translationTexts }}>{children}</LanguageContext.Provider>
//	)
//}

//export const useLanguage = () => {
//	const context = useContext(LanguageContext)
//	//console.log(context)
//	if (!context) throw new Error("useLanguage must be used within LanguageProvider")
//	return context
//}
