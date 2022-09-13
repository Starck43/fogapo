import Link from "next/link"

import {daysToTarget} from "../../core/utils"


const Items = ({selected, items, closeHandler}) => {
	return (
		items.map((item, index) =>
			<li className={`forum ${index === 0 ? "top" : ""} ${selected === item.id ? "selected" : ""} `}
			    key={item.id}>
				<div className="forum-date">
					{item.date_forum && new Date(item.date_forum).toLocaleDateString("ru", {
						month: "long",
						day: "2-digit",
						year: "numeric",
						hour12: false,
					})}
					{index === 0 && daysToTarget(item.date_forum)}
				</div>
				<Link href={`/${item.id}`} replace>
					<a className={`forum-body shadow4`} onClick={closeHandler}>
						<div className="forum-title">
							<h4 className="title">{item.title}</h4>
							{item.subtitle && <div className="subtitle">{item.subtitle}</div>}
						</div>

						{item?.events.length > 0 &&
						<ul className="forum-events">
							{item.events.map(event =>
								<li className="event" key={event.id}>
									{event.host?.pre_name &&
									<span className="host-pre-name">{event.host.pre_name}&nbsp;</span>}
									{event.host?.name && <span className="host-name">{event.host.name}</span>}
									{event.host?.name && event.title &&
									<span className="event-title">&nbsp;с темой <i>"{event.title}"</i></span>}
								</li>
							)}
						</ul>
						}
					</a>
				</Link>
			</li>
		))
}
export default Items