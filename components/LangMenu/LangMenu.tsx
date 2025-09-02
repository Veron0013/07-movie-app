//import { useState, useRef, useEffect } from "react"
import { useEffect } from "react"
import type { LangType } from "../../types/translationKeys"
import css from "./LangMenu.module.css"

interface LanguageProps {
	onClose: () => void
	onSelect: (langValue: LangType) => void
	position: { top: number; left: number }
}

export default function DropdownMenu({ onClose, onSelect, position }: LanguageProps) {
	//const [isOpen, setIsOpen] = useState(false)
	//const menuRef = useRef<HTMLDivElement>(null)

	//const toggleMenu = () => setIsOpen((prev) => !prev)

	//// Закриття по кліку поза меню
	const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	//escape close
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		document.body.style.overflow = "hidden"

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = ""
		}
	}, [onClose])

	function handleClick(langValue: LangType): void {
		onSelect(langValue)
	}

	return (
		<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
			<div
				className={css.menu__wrapper}
				style={{
					top: position.top,
					left: position.left,
				}}
			>
				<ul>
					<li className={css.menu__item} onClick={() => handleClick("uk-UA")}>
						UA
					</li>
					<li className={css.menu__item} onClick={() => handleClick("en-US")}>
						EN
					</li>
				</ul>
			</div>
		</div>
	)
}
