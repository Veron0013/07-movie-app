"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLangStore } from "@/stores/langStore"

export default function HomePage() {
	const router = useRouter()
	const { lang } = useLangStore()

	useEffect(() => {
		router.replace(`/${lang || "en-US"}`)
	}, [lang, router])

	return null
}
