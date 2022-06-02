import {useState} from "react"
import {HiOutlineCalendar} from "react-icons/hi"
import {AlertDialog} from "../UI/dialogs"
import Link from "next/link"


const Calendar = ({currentId, posts}) => {
	const [isShow, setShow] = useState(false)
	console.log(currentId, posts)
	const CalendarHandler = () => {
		setShow(!isShow)
	}

	return (
		<>
			<HiOutlineCalendar onClick={CalendarHandler}/>
			{isShow &&
			<AlertDialog title="Календарь мероприятий"
			             show={isShow}
			             closeHandler={setShow}
			             className="events-calendar-modal"
			>
				<ul>
					{posts.map(post => (
						<li>
							<Link href={`/${post.id}`}><a onClick={CalendarHandler}>{post.title}</a></Link>
							<small className="small text-muted">
								{new Date(post.date_forum).toLocaleDateString("ru", {
									hour12: false,
								})}
							</small>
						</li>
					))}
				</ul>
			</AlertDialog>}
		</>
	)
}

export default Calendar