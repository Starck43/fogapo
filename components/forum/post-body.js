import Appeals from "./appeals"
import Events from "./events"
import Partners from "./partners"
import Contacts from "./contacts"
import Reviews from "./reviews"
import DATA from "../../core/constants"
import Container from "../UI/container"


export default function PostBody({post}) {
	const {events, partners, reviews, location, info} = post
	let background = post?.page_background || DATA.background

	return (
		<main className="post post-body">

			<section className="appeals-forum bg-image bg-color-secondary py-4vh"
			         style={{
				         backgroundImage: `url(${background})`,
				         backgroundPosition: "right bottom",
				         //backgroundSize: "contain"
			         }}
			>
				<Appeals{...post} className="appeals-container p-4 my-4"/>
			</section>

			{events.length > 0 &&
			<section className="events-forum bg-color-brand shadow4 py-4vh">
				<Events events={events} className="events-container px-4vw my-4"/>
			</section>
			}

			{(partners.length > 0 || location || info) &&
			<section className="info-forum bg-color-secondary bg-image py-4vh"
			         style={{
				         backgroundImage: `url(${background})`
			         }}
			>
				<Container className="info-container flex-wrap">
					<Partners partners={partners} showTitle defaultType="name" className="partners-block px-4vw my-4"/>
					<Contacts location={location} info={info} className="contacts-block flex-column px-4vw my-4"/>
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
