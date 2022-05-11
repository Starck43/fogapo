import {HtmlContent} from "../UI/html-content"


export default function Events({events}) {
	return (
		<section className="events-forum py-4vh">
			{
				events.map(event => (
					<article className="event" key={event.id}>
						{event.title && <h2 className="event-title">{event.title}</h2>}
						{event.event_time && <div className="event-time">{event.event_time}</div>}
						{event.content && <HtmlContent className="event-content flex-column large-text">{event.content}</HtmlContent>}
					</article>
				))
			}
		</section>
	)
}