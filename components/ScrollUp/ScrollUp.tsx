import { SCROLL_TO_TOP } from "../../services/vars"
import css from "./ScrollUp.module.css"

interface ScrollUpProps {
	onClick: () => void
}
export default function ScrollUp({ onClick }: ScrollUpProps) {
	const handleOnClick = () => {
		onClick()
	}
	return (
		<div className={css.scroller} onClick={handleOnClick}>
			<img src={SCROLL_TO_TOP} alt="Scroll to top" />
		</div>
	)
}
