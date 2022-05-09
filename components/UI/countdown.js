import {useTimeCounter} from "../../core/hooks"

export default function Countdown({datetime}) {
	let countdown = useTimeCounter(datetime)
	let {days, hours, minutes, seconds} = countdown
	return (
		Object.keys(countdown).length ? (
			<div className="countdown-block flex-wrap end">
				<h4 className="countdown-title col-12">До мероприятия осталось:</h4>
				<div className="number-wrapper flex-column center"><div className="two-digit centered">{days}</div><span>Дней</span></div>
				<div className="number-wrapper flex-column center"><div className="two-digit centered">{hours}</div><span>Часов</span></div>
				<div className="number-wrapper flex-column center"><div className="two-digit centered">{minutes}</div><span>Минут</span></div>
				<div className="number-wrapper flex-column center"><div className="two-digit centered">{seconds}</div><span>Секунд</span></div>
			</div>
		) : null
	)
}
