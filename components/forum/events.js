import { memo } from "react"

import { HtmlContent } from "../UI/html-content"
import { Avatar } from "../UI/avatar"
import Container from "../UI/container"
import Title from "../UI/title"

function Events({ events, className }) {
    return (
        <Container className={className}>
            {events.map((event) => (
                <article className="event my-4vh flex-column" key={event.id}>
                    {event?.host && (
                        <div className="event-host flex-wrap">
                            <Title
                                as="h3"
                                href={event.host?.link}
                                title={event.host?.name}
                                subTitle={event.host?.pre_name}
                                className="host-title reverse"
                            />

                            <Avatar
                                src={event.host?.avatar}
                                width={150}
                                alt={event.host?.name}
                                title={
                                    <HtmlContent className="host-excerpt">
                                        {event.host?.excerpt}
                                    </HtmlContent>
                                }
                                className="host-avatar gap"
                            />
                        </div>
                    )}

                    <div className="event-description flex-column">
                        <Title as="h2" title={event.title} className="event-title" />
                        <HtmlContent className="event-content">{event.content}</HtmlContent>
                        {event.event_time ? (
                            <small className="event-time mx-auto bg-color-white">
                                Начало в: {event.event_time}
                            </small>
                        ) : null}
                    </div>
                </article>
            ))}
        </Container>
    )
}

export default memo(Events)
