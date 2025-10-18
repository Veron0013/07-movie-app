"use client"
import React, { useEffect, useState } from "react"
import css from "@/components/Footer/Footer.module.css"
import { useLangStore } from "@/stores/langStore"

export default function Footer() {
	const { translationTexts } = useLangStore()
	const [hydrated, setHydrated] = useState(false)

	useEffect(() => {
		setHydrated(true)
	}, [])

	if (!hydrated) {
		return (
			<footer className={css.footer}>
				<p>© {new Date().getFullYear()} Movie App DB. All rights reserved.</p>
			</footer>
		)
	}

	return (
		<footer className={css.footer}>
			<div className={css.content}>
				{/*<p>© {`${new Date().getFullYear()} Movie App DB. ${translationTexts.footer_rights}.`}</p>*/}
				<p>© {`${new Date().getFullYear()} Movie App DB. All rights reserved.`}</p>
				<div className={css.wrap}>
					{/*<p>{`${translationTexts.footer_dev}: Igor Vdovyka`}</p>*/}
					<p>{`Developer: Igor Vdovyka`}</p>
					<p>
						{/*{`${translationTexts.footer_contact}: `}*/}
						{`Contact us: `}
						<a href="mailto:iv_mirsoft@ukr.net"> iv_mirsoft@ukr.net</a>
					</p>
				</div>
			</div>
		</footer>
	)
}
