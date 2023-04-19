import { memo } from "react"
import Link from "next/link"

import { daysToTarget } from "../../core/utils"

// eslint-disable-next-line react/display-name
export const GroupItems = memo((props) => {
    const { id, title, subtitle, date_forum, events, currentIndex, selected, closeHandler } = props

    return (
        <li
            className={`forum ${currentIndex === 0 ? "top" : ""} ${
                selected === id ? "selected" : ""
            } `}
            key={id}
        >
            <div className="forum-date">
                {date_forum &&
                    new Date(date_forum).toLocaleDateString("ru", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                        hour12: false,
                    })}

                {daysToTarget(date_forum)}
            </div>

            <Link href={`/${id}`} className={`forum-body`} onClick={closeHandler}>
                <div className="forum-title">
                    <h4 className="title">{title}</h4>
                    {subtitle && <div className="subtitle">{subtitle}</div>}
                </div>

                {events.length ? (
                    <ul className="forum-events">
                        {events.map((event) => (
                            <li className="event" key={event.id}>
                                {/*{event.host?.pre_name && <span className="host-pre-name">{event.host.pre_name} </span>}*/}
                                {event.host?.name && (
                                    <span className="host-name">{event.host.name}</span>
                                )}
                                {event.host?.name && event.title && (
                                    <span className="event-title">
                                        {" "}
                                        с темой <i>&laquo;{event.title}&raquo;</i>
                                    </span>
                                )}
                                <div className="forum-time">
                                    Начало:{" "}
                                    {new Date(date_forum).toLocaleTimeString("ru", {
                                        hour12: false,
                                        timeStyle: "short",
                                    })}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </Link>
        </li>
    )
})
