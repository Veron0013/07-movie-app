"use client"
import { useEffect } from "react"
import type { LangType } from "../../types/translationKeys"
import css from "./LangMenu.module.css"
import { useLangStore } from "@/stores/langStore"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

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
	const searchParams = useSearchParams()
	const cPage: number = Number(searchParams.get("page"))

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

		//document.body.style.overflow = "hidden"
		document.addEventListener("keydown", handleKeyDown)
		document.addEventListener("scroll", () => onClose())

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("scroll", () => onClose())
			//document.body.style.overflow = ""
		}
	}, [onClose])

	function handleClick(langValue: string): void {
		changeLang(langValue as LangType)

		const segments = pathname.split("/")
		segments[1] = langValue

		const params = new URLSearchParams(searchParams.toString())

		if (cPage) {
			params.set("page", String(cPage))
		} else {
			params.delete("page")
		}

		const newPath = `${segments.join("/")}${params.size ? "?" + params.toString() : ""}`

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
					</li>
					<li className={css.menu__item} onClick={() => handleClick("en-US")}>
						EN
					</li>
				</ul>
			</div>
		</div>
	)
}
