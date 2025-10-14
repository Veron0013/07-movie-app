"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DiscoverFilter, getMoviesGenres } from "@/lib/movieService"
import { SortOption } from "@/types/movie"
import Select, { GroupBase, MultiValue, OnChangeValue, StylesConfig } from "react-select"
import { useLangStore } from "@/stores/langStore"
import DateSelect from "./DateSelect"
import css from "./DropdownDiscover.module.css"

type GenreOption = { value: string; label: string }
type SortOptionType = { value: SortOption; label: string }

export default function DropdownDiscover({ lang }: { lang: string }) {
	const router = useRouter()
	const [genres, setGenres] = useState<GenreOption[]>([])
	const [filters, setFilters] = useState<DiscoverFilter>({
		sort_by: SortOption.POPULARITY_DESC,
	})
	const { translationTexts } = useLangStore()

	//стилізація react-select
	const selectStyles = <
		TOption,
		IsMulti extends boolean = false,
		Group extends GroupBase<TOption> = GroupBase<TOption>
	>(): StylesConfig<TOption, IsMulti, Group> => ({
		control: (base) => ({
			...base,
			backgroundColor: "#1e293b",
			borderColor: "#334155",
			color: "white",
			boxShadow: "none",
			"&:hover": { borderColor: "#64748b" },
		}),
		menu: (base) => ({
			...base,
			backgroundColor: "#1e293b",
			color: "white",
		}),
		option: (base, state) => ({
			...base,
			backgroundColor: state.isSelected ? "#475569" : state.isFocused ? "#334155" : "transparent",
			color: "white",
			cursor: "pointer",
		}),
		singleValue: (base) => ({ ...base, color: "white" }),
		multiValue: (base) => ({
			...base,
			backgroundColor: "#334155",
		}),
		multiValueLabel: (base) => ({
			...base,
			color: "white",
		}),
	})

	const SORT_OPTIONS_ARRAY: { label: string; value: SortOption }[] = [
		{ label: translationTexts.sortOptions[SortOption.POPULARITY_DESC], value: SortOption.POPULARITY_DESC },
		{ label: translationTexts.sortOptions[SortOption.POPULARITY_ASC], value: SortOption.POPULARITY_ASC },
		{ label: translationTexts.sortOptions[SortOption.VOTE_AVERAGE_DESC], value: SortOption.VOTE_AVERAGE_DESC },
		{ label: translationTexts.sortOptions[SortOption.VOTE_AVERAGE_ASC], value: SortOption.VOTE_AVERAGE_ASC },
		{
			label: translationTexts.sortOptions[SortOption.PRIMARY_RELEASE_DATE_DESC],
			value: SortOption.PRIMARY_RELEASE_DATE_DESC,
		},
		{
			label: translationTexts.sortOptions[SortOption.PRIMARY_RELEASE_DATE_ASC],
			value: SortOption.PRIMARY_RELEASE_DATE_ASC,
		},
		{ label: translationTexts.sortOptions[SortOption.TITLE_ASC], value: SortOption.TITLE_ASC },
		{ label: translationTexts.sortOptions[SortOption.TITLE_DESC], value: SortOption.TITLE_DESC },
	]

	useEffect(() => {
		let isMounted = true // захист від setState після анмаунту

		const fetchGenres = async () => {
			try {
				const data = await getMoviesGenres({ language: lang })

				const genres = data
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((g) => ({
						value: String(g.id),
						label: g.name,
					}))

				if (isMounted) {
					setGenres(genres ?? [])
				}
			} catch (err) {
				console.error("Genre load error:", err)
			}
		}

		fetchGenres()

		return () => {
			isMounted = false
		}
	}, [lang])

	const handleApply = () => {
		const params = new URLSearchParams()

		Object.entries(filters).forEach(([key, value]) => {
			if (!value) return
			const normalizedKey = key.replace("_gte", ".gte").replace("_lte", ".lte")
			params.append(normalizedKey, value)
		})

		router.push(`/${lang}/discover?${params.toString()}`)
	}

	const onChangeWithGenres = (newValue: MultiValue<GenreOption>) => {
		if (newValue.length) {
			const nfilter = newValue.map((item) => item.value).join(",")
			setFilters((prev) => ({
				...prev,
				with_genres: nfilter,
			}))
		}
	}

	const onChangeSort = (newValue: OnChangeValue<SortOptionType, false>) => {
		setFilters({ ...filters, sort_by: newValue?.value || SortOption.POPULARITY_DESC })
	}

	return (
		<div className={css.dropdown_container}>
			<div className={css.grid}>
				<h3>{translationTexts.dicovery_filters}</h3>

				<label>
					{translationTexts.sortBy}:
					<Select<SortOptionType, false>
						classNamePrefix="react-select"
						options={SORT_OPTIONS_ARRAY}
						value={SORT_OPTIONS_ARRAY.find((opt) => opt.value === filters.sort_by)}
						onChange={onChangeSort}
						styles={selectStyles<SortOptionType, false>()}
					/>
				</label>

				<label>
					<DateSelect
						label={translationTexts.release_date_from}
						value={filters.release_date_gte}
						onChange={(date) => setFilters({ ...filters, release_date_gte: date })}
						lang={lang}
					/>
				</label>

				<label>
					<DateSelect
						label={translationTexts.release_date_to}
						value={filters.release_date_lte}
						onChange={(date) => setFilters({ ...filters, release_date_lte: date })}
						lang={lang}
					/>
				</label>

				<label className={css.genre_label}>
					{translationTexts.genres}:
					{!!genres.length && (
						<Select<GenreOption, true>
							classNamePrefix="react-select"
							isMulti
							closeMenuOnSelect={false}
							name="genres"
							options={genres}
							placeholder={translationTexts.select_genres}
							onChange={onChangeWithGenres}
							styles={selectStyles<GenreOption, true>()}
						/>
					)}
				</label>

				<button onClick={handleApply}>{translationTexts.apply_filters}</button>
			</div>
		</div>
	)
}
