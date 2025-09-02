import { createPortal } from "react-dom"
import css from "./ErrorMessage.module.css"
import { useLanguage } from "../LanguageContext/LanguageContext"

export default function ErrorMessage() {
	const { translationTexts } = useLanguage()
	return createPortal(
		<div>
			<p className={css.text}>{translationTexts.error_main_text}</p>
		</div>,
		document.body
	)
}
