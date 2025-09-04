import { ReactNode } from "react"

//export default function LangLayout({ children, params }: { children: ReactNode; params: { lang: string } }) {

export default function LangLayout({ children }: { children: ReactNode }) {
	return (
		//<html lang={params.lang}>
		<>{children}</>
		//</html>
	)
}
