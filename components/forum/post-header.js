import Link from 'next/link'

import ForumDate from "./forum-date"
import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

export default function PostHeader({src, title, subtitle, datetime}) {
	return (
		<header className="post-header flex-column">
			<Container className="py-2">
				<Link href="/">
					<a><Logo name={title} src={src}/></a>
				</Link>

				<div className="header-title">
					<h1>{title}</h1>

					{subtitle &&
					<HtmlContent className="subtitle">
						{subtitle}
					</HtmlContent>
					}
				</div>
				<ForumDate datetime={new Date(datetime)}/>
			</Container>
			<section className="activities">

			</section>
		</header>
	)
}
