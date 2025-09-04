import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"
import Footer from "@/components/Footer/Footer"
import SearchBar from "@/components/SearchBar/SearchBar"
import { Toaster } from "react-hot-toast"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Movie DB App",
	description: "Simple movie DB app",
	openGraph: {
		title: `Movie DB app`,
		description: "Simple movie DB app",
		url: `https://movieDB.com`,
		siteName: "Movie DB",
		images: [
			{
				url: "https://ac.goit.global/fullstack/react/movie DB-og-meta.jpg",
				width: 1200,
				height: 630,
				alt: "Movie DB",
			},
		],
		type: "website",
	},
	icons: {
		icon: "/favicon.png",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<TanStackProvider>
					{/*<LanguageProvider>*/}
					<div className="layout">
						<SearchBar />
						<main className="main">{children}</main>
						<Footer />
					</div>
					<Toaster />
					{/*</LanguageProvider>*/}
					<ReactQueryDevtools initialIsOpen={false} />
				</TanStackProvider>
			</body>
		</html>
	)
}
