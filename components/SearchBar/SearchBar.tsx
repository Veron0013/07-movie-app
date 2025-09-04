"use client"

import { useState } from "react"
import LangMenu from "../LangMenu/LangMenu"
import css from "./SearchBar.module.css"
import { createPortal } from "react-dom"
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik"
import * as Yup from "yup"
import toastMessage, { MyToastType } from "@/lib/messageService"
import Link from "next/link"
import { useLangStore } from "@/stores/langStore"

//interface SearchBarProps {
//	onSubmit: (query: string) => void
//	selectTrend: () => void
//}

interface FormValues {
	query: string
}

//export default function SearchBar({ selectTrend, onSubmit }: SearchBarProps) {
export default function SearchBar() {
	const { translationTexts } = useLangStore()

	const [isMenuOpen, setIsMenulOpen] = useState(false)
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
		console.log(queryData)
		//onSubmit(queryData)
	}

	//function handleShowMenu(langValue: LangType): void {
	//	setIsMenulOpen(false)
	//	//setLanguage(langValue)
	//}

	const handleMenu = (e: React.MouseEvent<HTMLElement>): void => {
		const rect = e.currentTarget.getBoundingClientRect()
		setModalPos({
			top: rect.bottom + window.scrollY + 4,
			left: rect.left + window.scrollX - 16,
		})
		setIsMenulOpen(true)
	}

	const handleTranding = () => {
		console.log("trend")
	}

	const handleCloseMenu = () => {
		setIsMenulOpen(false)
	}

	return (
		<header className={css.header}>
			<div className={css.container}>
				<Link className={css.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
					{`${translationTexts.searchBar_poweredBy} TMDB`}
				</Link>
				<div className={css.container__data}>
					<p className={css.lang} onClick={handleTranding}>
						{translationTexts.searchBar_Trend}
					</p>
					<p className={css.lang} onClick={handleMenu}>
						{translationTexts.searchBar_lang}
					</p>
					{isMenuOpen && createPortal(<LangMenu onClose={handleCloseMenu} position={modalPos} />, document.body)}
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
