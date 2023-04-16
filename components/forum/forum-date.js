import {memo} from "react"
import DateFormatter from "../UI/date-formatter"
import Countdown from "../UI/countdown"


function ForumDate({datetime}) {
	return (
		<div className="date-block">
			<DateFormatter datetime={datetime}/>
			<div className="at-time">начало в {datetime.toLocaleTimeString("ru", {
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
			})}
			</div>
		</div>

	)
}

export default memo(ForumDate)
