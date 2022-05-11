import Link from 'next/link'

import ForumDate from "./forum-date"
import Appeals from "./appeals"
import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA from "../../core/constants"


export default function PostHeader({src, title, subtitle, datetime, extra_logo, appeals}) {
	return (
		<header className="post-header flex-column">
			<Container className="py-2vh">
				<div className="header-logos flex-wrap">
					<Link href="/">
						<a className="logo-link"><Logo name={title} src={src}/></a>
					</Link>
					{ extra_logo &&
					<Link href={extra_logo.href}>
						<a className="logo-link extra"><Logo name={extra_logo.title} src={extra_logo.src}/></a>
					</Link>
					}
				</div>

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
			<Appeals post={appeals}/>
		</header>
	)
}
