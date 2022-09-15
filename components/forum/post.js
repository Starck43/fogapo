//import {useEffect} from "react"
import Head from "next/head"

import PostHeader from "./post-header"
import PostBody from "./post-body"
import PostFooter from "./post-footer"

import DATA, {SITE_NAME} from "../../core/constants"


export default function Post({post, posts}) {

/*
	useEffect( () => {
		let background = post?.page_background || DATA.background
		document.body.style.background = `url(${background}) bottom right scroll no-repeat`
	},[post])
*/

	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="title" content={post.title}/>
				<meta name="description" content={post.description}/>
				<meta name="keywords" content={post.keywords}/>
				<meta property="og:type" content="website"/>
				<meta property="og:locale" content="ru_RU"/>
				<meta property="og:site_name" content={SITE_NAME}/>
				<meta property="og:description" content={post.description}/>
				<meta property="og:title" content={post.title}/>
				<meta property="og:image" content={DATA.logo}/>
			</Head>

			<PostHeader posts={posts} post={post}/>
			<PostBody post={post}/>
			<PostFooter post={post}/>
		</>
	)
}
