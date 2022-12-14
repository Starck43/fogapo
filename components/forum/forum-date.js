import {memo} from "react"
import DateFormatter from "../UI/date-formatter"
import Countdown from "../UI/countdown"


function ForumDate({datetime}) {
	return (
		<div className="date-forum flex-column end">
			<div className="date-block">
				<DateFormatter datetime={datetime}/>
				<div className="at-time">начало в {datetime.toLocaleTimeString('ru', {
						hour12: false,
						hour: '2-digit',
						minute: '2-digit',
					})}
				</div>
			</div>
			<Countdown datetime={datetime}/>
		</div>
	)
}

export default memo(ForumDate)
