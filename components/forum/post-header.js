import Link from 'next/link'

import ForumDate from "./forum-date"
import Appeals from "./appeals"
import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA from "../../core/constants"


export default function PostHeader({src, title, subtitle, datetime}) {
	const post = DATA.posts[0]
	return (
		<header className="post-header flex-column">
			<Container className="py-2">
				<Link href="/">
					<a className="logo-link"><Logo name={title} src={src}/></a>
				</Link>

				<div className="header-title">
					<h1>{title}</h1>

					{subtitle &&
					<HtmlContent className="subtitle highlight">
						{subtitle}
					</HtmlContent>
					}
				</div>
				<ForumDate datetime={new Date(datetime)}/>
			</Container>
			<Appeals post={post}/>
		</header>
	)
}
