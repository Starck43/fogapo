import Head from 'next/head'
import {HOME_TITLE} from "../core/constants"

const Meta = () => (
		<Head>
			<meta charSet="utf-8"/>
			<title>{HOME_TITLE}</title>
			<link
				href="/fonts/exo2_0_regular.woff2"
				rel="stylesheet"
				crossOrigin
			/>
			<link
				href="/fonts/exo2_0_regular.woff2"
				rel="preload"
				as="font"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicons/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicons/site.webmanifest"/>
			<link
				rel="mask-icon"
				href="/favicons/safari-pinned-tab.svg"
				color="#000000"
			/>
			<meta name="msapplication-TileColor" content="#000000"/>
			<meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
			<meta name="theme-color" content="#000"/>
			<link rel="shortcut icon" href="/favicons/favicon.ico"/>
			<link rel="alternate" type="application/rss+xml" href="/feed.xml"/>

			<meta property="og:image" content={'/logo.png'}/>
			<meta name="robots" content="follow, index"/>
			<meta name="googlebot" content="index,follow"/>

		</Head>
	)


export default Meta

