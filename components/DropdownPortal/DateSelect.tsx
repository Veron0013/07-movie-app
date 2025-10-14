"use client"
import css from "./DropdownDiscover.module.css"

interface DateSelectProps {
	label: string
	value: string | undefined
	onChange: (value: string) => void
	lang: string
}

export default function DateSelect({ label, value, onChange, lang }: DateSelectProps) {
	return (
		<div className={css.date_select}>
			<label>{label}:</label>
			<input type="date" value={value || ""} lang={lang} onChange={(e) => onChange(e.target.value)} />
		</div>
	)
}
