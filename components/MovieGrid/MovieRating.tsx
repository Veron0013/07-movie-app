import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import css from "./MovieGrid.module.css"

interface Props {
	percentage: number
}

export default function MovieRating({ percentage }: Props) {
	function getColorHSL(value: number) {
		const t = Math.max(0, Math.min(1, value / 100))
		const hue = 150 * t
		return `hsl(${hue}, 100%, 50%)`
	}

	const textValue: string = percentage === 0 ? "N/A" : `${String(Math.round(percentage))}%`

	return (
		<div className={css.progressbar}>
			{/* Нижній шар – темна обводка */}
			<CircularProgressbar
				value={percentage}
				strokeWidth={20}
				text={textValue}
				background={true}
				styles={buildStyles({
					pathColor: getColorHSL(percentage), // твій градієнт/колір
					trailColor: "transparent",
					backgroundColor: "#0a2f1f",
					textColor: "#ffffff", // 🎯 колір тексту
					textSize: "24px", // 🎯 розмір тексту
				})}
			/>
		</div>
	)
}
