import {HtmlContent} from "../UI/html-content"
import {Avatar} from "../UI/avatar"


export default function Events({events}) {
	return (
		events.map(event =>
			<article className="event" key={event.id}>
				{event.title && <h2 className="title event-title">{event.title}</h2>}

				{event.host &&
				<div className="event-host">
					<div className="meta cell-auto">
						{event.host?.pre_name && <span>{event.host.pre_name}</span>}
						{event.host?.name && <h3 className="host-title">{event.host.name}</h3>}
						{event.host?.excerpt && <p className="host-excerpt">{event.host.excerpt}</p>}
					</div>

					{event.host?.avatar &&
						<Avatar src={event.host?.avatar} width={320} className="cell-4 shadow4"/>
					}
				</div>
				}
				{event.content &&
				<HtmlContent className="event-content flex-wrap large-text">{event.content}</HtmlContent>}

				{event.event_time && <small className="event-time">Начало в: {event.event_time}</small>}

			</article>
		)
	)
}