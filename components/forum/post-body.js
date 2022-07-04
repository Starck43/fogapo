import Events from "./events"
import Container from "../UI/container"
import Partners from "./partners"
import Contacts from "./contacts"


export default function PostBody({events, partners, location, info}) {
	return (
		<main className="post">
			<Container className="py-4vh flex-wrap">
				{events.length > 0 && <Events events={events}/>}
				{partners.length === 1 &&
				<section className="partners-forum cell-auto">
					<h3>Партнер мероприятия</h3>
					<Partners className="partner-logos" partners={partners} fields={['logo']}/>
				</section>
				}
				{partners.length > 1 &&
				<section className="partners-forum cell-auto">
					<h3>Партнеры</h3>
					<Partners className="partner-names" partners={partners} fields={["name"]}/>
				</section>
				}

				<section className="contacts-forum cell-auto">
					<Contacts className="contacts-block" location={location} info={info}/>
				</section>

			</Container>
		</main>
	)
}
