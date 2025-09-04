"use client"
import { useLangStore } from "@/stores/langStore"
import css from "../components/ErrorMessage/ErrorMessage.module.css"

export default function ErrorMessage() {
	const { translationTexts } = useLangStore()
	return (
		<div>
			<p className={css.text}>{translationTexts.error_main_text}</p>
		</div>
	)
}
