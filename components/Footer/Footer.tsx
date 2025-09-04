"use client"
import React from "react"
import css from "@/components/Footer/Footer.module.css"
import { useLangStore } from "@/stores/langStore"

export default function Footer() {
	const { translationTexts } = useLangStore()
	return (
		<footer className={css.footer}>
			<div className={css.content}>
				<p>© {`${new Date().getFullYear()} Movie App DB. ${translationTexts.footer_rights}.`}</p>
				<div className={css.wrap}>
					<p>{`${translationTexts.footer_dev}: Igor Vdovyka`}</p>
					<p>
						{`${translationTexts.footer_contact}: `}
						<a href="mailto:iv_mirsoft@ukr.net"> iv_mirsoft@ukr.net</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
