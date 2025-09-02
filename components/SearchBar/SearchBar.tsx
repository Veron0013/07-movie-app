import { useState } from "react"
import toastMessage, { MyToastType } from "../../services/messageService"
import LangMenu from "../LangMenu/LangMenu"
import { useLanguage } from "../LanguageContext/LanguageContext"
import css from "./SearchBar.module.css"
import type { LangType } from "../../types/translationKeys"
import { createPortal } from "react-dom"
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik"
import * as Yup from "yup"

interface SearchBarProps {
	onSubmit: (query: string) => void
	selectTrend: () => void
}

interface FormValues {
	query: string
}

export default function SearchBar({ selectTrend, onSubmit }: SearchBarProps) {
	const { translationTexts, setLanguage } = useLanguage()

	const [isMenulOpen, setIsMenulOpen] = useState(false)
	const [modalPos, setModalPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

	const initialFormValues: FormValues = {
		query: "",
	}
	const OrderSchema = Yup.object().shape({
		query: Yup.string().min(2, translationTexts.yup_min_query),
	})

	const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
		const queryData = values.query.trim()

		formikHelpers.resetForm()
		if (!queryData.trim().length) {
			toastMessage(MyToastType.loading, translationTexts.toast_no_request)
			return
		}
		onSubmit(queryData)
	}

	function handleShowMenu(langValue: LangType): void {
		setIsMenulOpen(false)
		setLanguage(langValue)
	}

	const handleMenu = (e: React.MouseEvent<HTMLElement>): void => {
		const rect = e.currentTarget.getBoundingClientRect()
		setModalPos({
			top: rect.bottom + window.scrollY + 4,
			left: rect.left + window.scrollX - 16,
		})
		setIsMenulOpen(true)
	}

	const handleTranding = () => {
		selectTrend()
	}

	const handleCloseMenu = () => {
		setIsMenulOpen(false)
	}

	return (
		<header className={css.header}>
			<div className={css.container}>
				<a className={css.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
					{`${translationTexts.searchBar_poweredBy} TMDB`}
				</a>
				<div className={css.container__data}>
					<p className={css.lang} onClick={handleTranding}>
						{translationTexts.searchBar_Trend}
					</p>
					<p className={css.lang} onClick={handleMenu}>
						{translationTexts.searchBar_lang}
					</p>
					{isMenulOpen &&
						createPortal(
							<LangMenu onClose={handleCloseMenu} onSelect={handleShowMenu} position={modalPos} />,
							document.body
						)}
					<Formik initialValues={initialFormValues} validationSchema={OrderSchema} onSubmit={handleSubmit}>
						<Form className={css.form}>
							<div className={css.wrapper}>
								<Field
									className={css.input}
									type="text"
									name="query"
									autoComplete="off"
									placeholder={translationTexts.searchBar_placeholder}
									autoFocus
								/>
								<ErrorMessage name="query" component="div" className={css.error} />
							</div>
							<button className={css.button} type="submit">
								{translationTexts.searchBar_Button}
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</header>
	)
}
