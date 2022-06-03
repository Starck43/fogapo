import {Fragment, useState} from "react"
import {HiOutlineCalendar} from "react-icons/hi"
import {AlertDialog} from "../UI/dialogs"
import Link from "next/link"
import log from "tailwindcss/lib/util/log"


const Calendar = ({currentId, posts}) => {
	const [isShow, setShow] = useState(false)
	//console.log(currentId, posts)
	const calendarHandler = () => {
		setShow(!isShow)
	}

	return (
		<div className="calendar-button centered" onClick={calendarHandler}>
			<HiOutlineCalendar/>
			<span>Календарь мероприятий</span>
			{isShow &&
			<AlertDialog title="Календарь мероприятий"
			             show={isShow}
			             closeHandler={setShow}
			             className="events-calendar-modal"
			             size="md"
			>
				{Object.keys(posts).map(key => (
					<div key={key} className="forum-group">
						<h4>{key === "prev_forums" ? "Архив мероприятий" : "Предстоящие мероприятия"}</h4>
						<ul>
							<CalendarItems currentId={currentId} items={posts[key]} closeHandler={calendarHandler}/>
						</ul>
					</div>
				))}
			</AlertDialog>}
		</div>
	)
}

export default Calendar

const CalendarItems = ({currentId, items, closeHandler}) => (
	items.map(post => (
		<li key={post.id}>
			{currentId !== post.id
				? <Link href={`/${post.id}`}><a onClick={closeHandler}>{post.title}</a></Link>
				: <div>{post.title}</div>
			}
			<small className="small text-muted">
				{new Date(post.date_forum).toLocaleDateString("ru", {
					hour12: false,
				})}
			</small>
		</li>
	))
)