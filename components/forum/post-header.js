import {memo} from "react"
import Link from "next/link"

import ForumDate from "./forum-date"
import Calendar from "../calendar/calendar"

import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA, {HOME_TITLE} from "../../core/constants"


function PostHeader({posts, post}) {
	return (
		<header className="post-header bg-color-primary flex-column p-4">
			<Container className="pt-5 pb-4">

				<Calendar selected={post?.id} posts={posts}/>

				<div className="header-logos flex-wrap">
					<Logo
						as={Link}
						href="/"
						src={DATA.logo}
						alt={post.title}
						width={150}
						height={150}
						className="logo-link"
					/>

					{post.add_logo &&
					<Logo
						as={Link}
						href={post.add_link || "#"}
						className="logo-link extra"
						src={post.add_logo}
					/>
					}
				</div>

				<div className="header-title">
					<h1>{HOME_TITLE}</h1>

					{post.subtitle &&
					<HtmlContent className="subtitle highlight">
						{post.subtitle}
					</HtmlContent>
					}
				</div>
				{post?.date_forum && <ForumDate datetime={new Date(post.date_forum)}/>}
			</Container>
		</header>
	)
}

export default memo(PostHeader)
