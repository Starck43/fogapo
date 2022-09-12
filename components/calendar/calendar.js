import {Fragment, useState} from "react"
import {AiFillCalendar as CalendarIcon} from "react-icons/ai"

import Items from "./items"
import {AlertDialog} from "../UI/dialogs"
import {Accordion} from "react-bootstrap"


const Calendar = ({selected, posts}) => {
	const [show, setShow] = useState(false)

	const handleCalendarModal = () => {
		setShow(!show)
	}

	return (
		<Fragment>
			<div className="calendar-button centered" onClick={handleCalendarModal}>
				<CalendarIcon/><span>Календарь мероприятий</span>
			</div>
			<AlertDialog
				title="Календарь мероприятий"
				show={show}
				handleClose={handleCalendarModal}
				className="events-calendar-modal"
				size="md"
				scrollable
			>
				<div className={`forum-group next`}>
					<h4 className="title">Предстоящие мероприятия</h4>
					<ul className="next-forums">
						<Items
							current={selected}
							items={posts.next_forums}
							closeHandler={handleCalendarModal}
						/>
					</ul>
				</div>

				<div className={`forum-group prev`}>
					<Accordion className="prev-forums-accordion">
						<Accordion.Item eventKey="1">
							<Accordion.Header><div className="title">Архив мероприятий</div></Accordion.Header>
							<Accordion.Body>
								<ul className="prev-forums">
									<Items
										current={selected}
										items={posts.prev_forums}
										closeHandler={handleCalendarModal}
									/>
								</ul>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>

				</div>
			</AlertDialog>
		</Fragment>
	)
}

export default Calendar
