export interface TranslationKeys {
	searchBar_lang: string
	searchBar_poweredBy: string
	searchBar_placeholder: string
	searchBar_Button: string
	searchBar_Trend: string
	loader_text: string
	error_main_text: string
	toast_bad_request: string
	toast_no_request: string
	genres: string
	releaseDate: string
	originalLanguage: string
	budget: string
	revenue: string
	rating: string
	popularity: string
	votes: string
	production: string
	notDescribed: string
	noBudget: string
	noRevenue: string
	pagiNext: string
	pagiPrev: string
	yup_min_query: string
	desc_year: string
	sortOptions: {
		"original_title.asc": string
		"original_title.desc": string
		"popularity.asc": string
		"popularity.desc": string
		"revenue.asc": string
		"revenue.desc": string
		"primary_release_date.asc": string
		"primary_release_date.desc": string
		"title.asc": string
		"title.desc": string
		"vote_average.asc": string
		"vote_average.desc": string
		"vote_count.asc": string
		"vote_count.desc": string
	}
}

export type LangType = "uk-UA" | "en-US"
