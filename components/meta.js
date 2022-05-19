import Head from 'next/head'
import {HOME_TITLE, yandexMetrikaId, googleAnalyticsId} from "../core/constants"


const Meta = () => (
		<Head>
			<meta charSet="utf-8"/>
			<title>{HOME_TITLE}</title>
			<link
				href="/fonts/exo2_0_regular.woff2"
				rel="stylesheet"
				crossOrigin="true"
			/>
			<link
				href="/fonts/exo2_0_bold.woff2"
				rel="preload"
				as="font"
				crossOrigin="true"
			/>
			<link
				href="/logo.svg"
				rel="preload"
				as="image"
				crossOrigin="true"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/svg"
				href="/logo.svg"
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
			<link
				rel="mask-icon"
				href="/favicons/safari-pinned-tab.svg"
				color="#8c52ff"
			/>
			<link rel="manifest" href="/favicons/site.webmanifest"/>
			<meta name="msapplication-TileColor" content="#8c52ff"/>
			<meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
			<meta name="theme-color" content="#a6a6a6"/>
			<link rel="shortcut icon" href="/favicons/favicon.ico"/>
			<link rel="alternate" type="application/rss+xml" href="/feed.xml"/>


			<meta name="robots" content="follow, index"/>
			<meta name="yandex-verification" content="0166bc6b3bf05401" />

			{process.env.NODE_ENV === "production" && googleAnalyticsId &&
				<>
					<meta name="googlebot" content="index, follow"/>
					<script async defer src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}/>

					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', '${googleAnalyticsId}');
							`
						}}
					/>
				</>
			}

			{process.env.NODE_ENV === "production" && yandexMetrikaId &&
				<>
					<script
						dangerouslySetInnerHTML={{__html: `
							(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
							(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

							ym(${yandexMetrikaId}, "init", {
								clickmap:true,
								trackLinks:true,
								accurateTrackBounce:true
							});
						`}}
					/>
					<noscript
						dangerouslySetInnerHTML={{__html: `
							<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>
						`}}
					/>
				</>
			}

		</Head>
	)


export default Meta

