import Events from "./events"
import Partners from "./partners"
import Contacts from "./contacts"
import Reviews from "./reviews"
import Appeals from "./appeals"
import Container from "../UI/container"


export default function PostBody({post}) {
	const {events, partners, reviews, location, info} = post
	return (
		<main className="post">
			<Appeals {...post}/>

			<Container className="my-4vh">
				{events.length > 0 &&
				<section className="events-forum py-4vh">
					<Events events={events}/>
				</section>
				}

				<section className="middle-section flex-wrap py-4vh">
					{partners.length === 1 &&
					<div className="partners-forum cell-auto px-4vw">
						<h3>Партнер мероприятия</h3>
						<Partners className="partner-logos" partners={partners} fields={["logo"]}/>
					</div>
					}

					{partners.length > 1 &&
					<div className="partners-forum cell-auto px-4vw my-4vh">
						<h3>Партнеры</h3>
						<Partners className="partner-names" partners={partners} fields={["name"]}/>
					</div>
					}

					{location && info &&
					<div className="contacts-forum flex-column cell-auto px-4vw my-4vh">
						<Contacts className="contacts-block" location={location} info={info}/>
					</div>
					}
				</section>

				{reviews?.length > 0 &&
				<section className="reviews-forum">
					<Reviews reviews={reviews} className="reviews-block my-4vh py-4vh"/>
				</section>
				}

			</Container>
		</main>
	)
}
