import Events from "./events"
import Container from "../UI/container"
import Partners from "./partners"
import Contacts from "./contacts"


export default function PostBody({events, partners, location, info}) {
	return (
		<main className="post">
			<Container className="py-4 flex-wrap">
				<Events events={events}/>
				<section className="partners-forum cell-auto">
					<h3>Организаторы</h3>
					<Partners className="partner-names" partners={partners} fields={['name']}/>
				</section>
				<section className="contacts-forum cell-auto">
					<Contacts className="contacts-block" location={location} info={info}/>
				</section>
			</Container>
		</main>
	)
}
