"use client"
import { useEffect } from "react"
import type { LangType } from "../../types/translationKeys"
import css from "./LangMenu.module.css"
import { useLangStore } from "@/stores/langStore"
import { useRouter, usePathname } from "next/navigation"

interface LanguageProps {
	onClose: () => void
	//onSelect: (langValue: LangType) => void
	position: { top: number; left: number }
}

export default function DropdownMenu({ onClose, position }: LanguageProps) {
	//const [isOpen, setIsOpen] = useState(false)
	//const menuRef = useRef<HTMLDivElement>(null)

	//const toggleMenu = () => setIsOpen((prev) => !prev)

	const router = useRouter()
	const { changeLang } = useLangStore()
	const pathname = usePathname()

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

	function handleClick(langValue: string): void {
		changeLang(langValue as LangType)

		// розбиваємо шлях на сегменти
		const segments = pathname.split("/")
		// перший сегмент завжди пустий (через leading "/"), другий — це lang
		segments[1] = langValue

		const newPath = segments.join("/")
		router.push(newPath)
		onClose()
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
						{/*<Link href={"/uk-UA"}>UA</Link>*/}
					</li>
					<li className={css.menu__item} onClick={() => handleClick("en-US")}>
						EN
					</li>
					{/*<li className={css.menu__item}>
						<Link href={"/en-US"}>EN</Link>
					</li>*/}
				</ul>
			</div>
		</div>
	)
}
