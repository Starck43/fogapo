import {useEffect} from "react"
import {useRouter} from "next/router"
import Head from "next/head"

import PostHeader from "./post-header"
import PostBody from "./post-body"
import PostFooter from "./post-footer"

import {SITE_NAME} from "../../core/constants"


export default function Post({post}) {
	const router = useRouter()

	useEffect( () => {
		document.body.style.background = `url(${post.page_background}) bottom right scroll no-repeat`
	},[])

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="title" content={post.title}/>
				<meta name="description" content={post.description}/>
				<meta name="keywords" content={post.keywords}/>
				<meta property="og:site_name" content={SITE_NAME}/>
				<meta property="og:description" content={post.description}/>
				<meta property="og:title" content={post.title}/>
				<meta property="og:image" content={post.logo}/>
				<link rel="canonical" href={router.basePath}/>
			</Head>

			<PostHeader title={post.title} subtitle={post.subtitle} src={post.logo} datetime={post.date_forum}/>
			<PostBody events={post.events} partners={post.partners} location={post.location} info={post.info}/>
			<PostFooter partners={post.partners} contacts={post.contacts}/>
		</>
	)
}
