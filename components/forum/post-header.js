import Link from "next/link"

import ForumDate from "./forum-date"
import Calendar from "../calendar/calendar"

import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA, {HOME_TITLE} from "../../core/constants"


export default function PostHeader({posts, post}) {
	return (
		<header className="post-header flex-column">
			<Container className="pt-5 pb-4">

				<Calendar selected={post.id} posts={posts}/>

				<div className="header-logos flex-wrap">
					<Link href="/">
						<a className="logo-link">
							<Logo src={DATA.logo} alt={post.title} width={150} height={150}/>
						</a>
					</Link>

					{post.add_logo &&
					<Link href={post.add_link || "#"}>
						<a className="logo-link extra"><Logo name="" src={post.add_logo}/></a>
					</Link>
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
				<ForumDate datetime={new Date(post.date_forum)}/>
			</Container>
		</header>
	)
}
