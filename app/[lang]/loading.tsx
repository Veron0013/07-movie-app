"use client"
import css from "@/components/Loader/Loading.module.css"
import { ScaleLoader } from "react-spinners"
import type { CSSProperties } from "react"
import { useLangStore } from "@/stores/langStore"

export default function Loader() {
	const override: CSSProperties = {
		display: "block",
		margin: "0 auto",
		borderColor: "#004182",
	}

	const { translationTexts } = useLangStore()

	//console.log("load")

	return (
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
		</div>
	)
}
