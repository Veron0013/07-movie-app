import { SCROLL_TO_TOP } from "@/lib/vars"
import css from "./ScrollUp.module.css"
import Image from "next/image"

interface ScrollUpProps {
	onClick: () => void
}
export default function ScrollUp({ onClick }: ScrollUpProps) {
	const handleOnClick = () => {
		onClick()
	}
	return (
		<div className={css.scroller} onClick={handleOnClick}>
			<Image src={SCROLL_TO_TOP} alt="Scroll to top" width={40} height={40} />
		</div>
	)
}
