import {useState, useEffect} from "react"
import Head from "next/head"

import PostHeader from "./post-header"
import PostBody from "./post-body"
import PostFooter from "./post-footer"

import DATA, {SITE_NAME} from "../../core/constants"

export default function Post({post, posts}) {
	const [isRegShow, setRegShow] = useState(false)

	useEffect( () => {
		let curDate = new Date()
		let forumDate = new Date(post.date_forum)
		let background = post?.page_background || DATA.background
		//console.log(forumDate);
		setRegShow(post.reg_is_active && curDate < forumDate)

		document.body.style.background = `url(${background}) bottom right scroll no-repeat`
	},[post])

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

			<PostHeader posts={posts} id={post.id} title={post.title} subtitle={post.subtitle} add_logo={post.logo} add_link={post.link} datetime={post.date_forum} isRegShow={isRegShow} reg_form={post.reg_form} cost={post.cost} content={post.content}/>
			<PostBody events={post.events} partners={post.partners} location={post.location} info={post.info}/>
			<PostFooter partners={post.partners} contacts={post.contacts}/>
		</>
	)
}
