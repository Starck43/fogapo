import {memo} from "react"
import Link from "next/link"

import ForumDate from "./forum-date"
import Calendar from "../calendar/calendar"

import Container from "../UI/container"
import {HtmlContent} from "../UI/html-content"
import {Logo} from "../UI/avatar"
import Countdown from "../UI/countdown"

import {HOME_TITLE} from "../../core/constants"
import Contacts from "./contacts"

import IconForum from "/public/logo.svg"

function PostHeader({posts, post}) {
	const datetime = new Date(post?.date_forum)

	return (
		<header className="post-header flex-wrap space-between align-items-center flex-column gap-4 p-4">

			<Calendar selected={post?.id} posts={posts}/>

			<div className="brand-header flex-wrap gap mt-4">
				<IconForum className="logo-svg"/>

				<div className="brand-title">
					<h1>{HOME_TITLE}</h1>
					{post.subtitle &&
					<HtmlContent as="h3" className="subtitle highlight">
						{post.subtitle}
					</HtmlContent>
					}
				</div>

				{post.add_logo &&
				<Logo
					as={Link}
					href={post.add_link || "#"}
					className="logo-link extra"
					src={post.add_logo}
				/>
				}
			</div>

			<div className="header-info flex-column space-between center gap my-auto p-4">

				<h2>
					{post.title}
				</h2>

				{
					datetime &&
					<ForumDate datetime={datetime}/>
				}
				<Contacts
					location={post?.location}
					isActive
					className="contacts-block flex-column"
				/>
			</div>
			<Countdown datetime={datetime}/>
		</header>
	)
}

export default memo(PostHeader)
