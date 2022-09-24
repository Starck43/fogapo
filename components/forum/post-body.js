import Appeals from "./appeals"
import Events from "./events"
import Partners from "./partners"
import Contacts from "./contacts"
import Reviews from "./reviews"
import DATA from "../../core/constants"
import Container from "../UI/container"
import {useEffect, useState} from "react"


export default function PostBody({post}) {
	const {date_forum, reg_is_active, events, partners, reviews, location, info} = post
	const [isActive, setActive] = useState(false)

	let background = post?.page_background || DATA.background

	useEffect(() => {
		if (date_forum) {
			let curDate = new Date()
			let forumDate = new Date(date_forum)
			setActive(reg_is_active && curDate < forumDate)
		}

	}, [date_forum, reg_is_active])


	if (!post?.id) {
		return (
			<main className="post post-body centered">
				<h3>Пока новых мероприятий не запланировано.<br/>Загляните позже!</h3>
			</main>
		)
	}

	return (
		<main className="post post-body">

			{date_forum &&
			<section className="appeals-forum bg-image bg-color-secondary pt-4vh"
			         style={{
				         backgroundImage: `url(${background})`,
				         backgroundPosition: "right bottom",
				         //backgroundSize: "contain"
			         }}
			>
				<Appeals isActive={isActive} {...post}/>
			</section>
			}

			{events?.length > 0 &&
			<section className="events-forum bg-color-brand shadow4 py-4vh">
				<Events events={events} className="events-container px-4vw my-4"/>
			</section>
			}

			{(partners?.length > 0 || location || info) &&
			<section className="info-forum bg-color-secondary bg-image py-4vh"
			         style={{
				         backgroundImage: `url(${background})`
			         }}
			>
				<Container className="info-container px-4vw flex-wrap">
					<Partners partners={partners} showTitle defaultType="name" className="partners-block my-4"/>
					<Contacts location={location} info={info} isActive={isActive} className="contacts-block flex-column my-4"/>
				</Container>
			</section>
			}

			{reviews?.length > 0 &&
			<section className="reviews-forum bg-color-primary py-4vh">
				<Reviews reviews={reviews} className="reviews-container px-4vw my-4"/>
			</section>
			}

		</main>
	)
}
