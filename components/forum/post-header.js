import Link from "next/link"

import ForumDate from "./forum-date"
import BodyContent from "./appeals"

import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA, {HOME_TITLE} from "../../core/constants"
import Image from "next/image"


export default function PostHeader({id, title, subtitle, datetime, add_logo, add_link, isRegShow, cost, content}) {
	return (
		<header className="post-header flex-column">
			<Container className="py-4vh">
				<div className="header-logos flex-wrap">
					<Link href="/">
						<a className="logo-link">
							<Image
								src={DATA.logo}
								alt={title}
								width={150}
								height={150}
								priority
								//placeholder="blur"
							/>
						</a>
					</Link>
					{add_logo &&
					<Link href={add_link || "#"}>
						<a className="logo-link extra"><Logo name="" src={add_logo}/></a>
					</Link>
					}
				</div>

				<div className="header-title">
					<h1>{HOME_TITLE}</h1>

					{subtitle &&
					<HtmlContent className="subtitle highlight">
						{subtitle}
					</HtmlContent>
					}
				</div>
				<ForumDate datetime={new Date(datetime)}/>
			</Container>
			<BodyContent id={id} content={content} cost={cost} isRegShow={isRegShow}/>
		</header>
	)
}
