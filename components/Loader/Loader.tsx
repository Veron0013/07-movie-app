import { createPortal } from "react-dom"
import { ScaleLoader } from "react-spinners"
import css from "./Loader.module.css"
import type { CSSProperties } from "react"
import { useLanguage } from "../LanguageContext/LanguageContext"

export default function Loader() {
	const override: CSSProperties = {
		display: "block",
		margin: "0 auto",
		borderColor: "#004182",
	}

	const { translationTexts } = useLanguage()

	//console.log("load")

	return createPortal(
		<div className={css.wrapper}>
			<ScaleLoader
				color="#004182"
				loading={true}
				cssOverride={override}
				//size={150}
				aria-label="Loading...."
				data-testid="loader"
			/>
			<span className={css.text}>{translationTexts.loader_text}</span>
		</div>,
		document.body
	)
}
