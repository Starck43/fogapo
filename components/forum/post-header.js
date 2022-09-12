import Link from "next/link"
import Image from "next/image"

import ForumDate from "./forum-date"
import BodyContent from "./appeals"
import Calendar from "../calendar/calendar"

import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"

import DATA, {HOME_TITLE} from "../../core/constants"


export default function PostHeader({
	                                   posts,
	                                   id,
	                                   title,
	                                   subtitle,
	                                   datetime,
	                                   add_logo,
	                                   add_link,
	                                   isRegShow,
	                                   reg_form,
	                                   cost,
	                                   content
                                   }) {
	return (
		<header className="post-header flex-column">
			<Container className="pt-5 pb-4">
				<Calendar selected={id} posts={posts}/>
				<div className="header-logos flex-wrap">
					<Link href="/">
						<a className="logo-link">
							<Image
								src={DATA.logo}
								alt={title}
								width={150}
								height={150}
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
			<BodyContent id={id} content={content} cost={cost} isRegShow={isRegShow} reg_form={reg_form}/>
		</header>
	)
}
