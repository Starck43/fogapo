import {HtmlContent} from "../UI/html-content"
import {Avatar} from "../UI/avatar"
import Container from "../UI/container"


export default function Events({events, ...props}) {
	const hostTitle = (name) => <h3 className="host-title">{name}</h3>

	return (
		<Container {...props}>
			{events.map(event =>
				<article className="event" key={event.id}>
					{event.title && <h2 className="title event-title">{event.title}</h2>}

					{event.host &&
					<div className="event-host">
						<div className="meta cell-auto">
							{event.host?.pre_name && <span>{event.host.pre_name}</span>}
							{event.host?.name && event.host?.link
								? <a href={event.host?.link} className="no-decoration">{hostTitle(event.host.name)}</a>
								: event.host?.name
									? hostTitle(event.host.name)
									: null
							}
							{event.host?.excerpt && <HtmlContent className="host-excerpt">{event.host.excerpt}</HtmlContent>}
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
			)}
		</Container>
	)
}