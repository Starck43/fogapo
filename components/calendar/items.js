import Link from "next/link"
import {Fragment} from "react"


const Items = ({current, items, closeHandler}) => {
	return (
		items.map((item, index) =>
			<Fragment>
				<div className="forum-date">
					<div className="date">
						{item.date_forum && new Date(item.date_forum).toLocaleDateString("ru", {
							month: "long",
							day: "2-digit",
							year: "numeric",
							hour12: false,
						})}
					</div>
				</div>
				<li key={item.id} className={`forum-body ${current === item.id ? "current" : ""} ${index === 0 ? "nearest" : ""}`}>
					<Link href={`/${item.id}`} passHref>
						<a onClick={closeHandler}>{item.title}</a>
					</Link>
					{item?.events.length > 0 &&
					<div className="events-list">
						<b>Специальный гость:</b>
						{item.events.map(event =>
							<article className="event" key={event.id}>
								{event.title && <div className="event-title">{event.title}</div>}
							</article>
						)}
					</div>
					}
				</li>
			</Fragment>
		))
}
export default Items