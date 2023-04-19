import { useTimeCounter } from "../../core/hooks"
import { isActiveDate } from "../../core/utils"

export default function Countdown({ datetime }) {
    //useEffect( () => {},[datetime])
    let countdown = useTimeCounter(datetime)

    if (!countdown || !isActiveDate(datetime)) {
        return null
    }

    let { days, hours, minutes, seconds } = countdown

    return (
        <div className="countdown-block flex-wrap end">
            <div className="countdown-title">До мероприятия осталось:</div>
            <div className="number-wrapper flex-column center gap-1">
                <div className="two-digit with-divider centered">{days}</div>
                <span className="number-text">Дней</span>
            </div>
            <div className="number-wrapper flex-column center gap-1">
                <div className="two-digit with-divider centered">{hours}</div>
                <span className="number-text">Часов</span>
            </div>
            <div className="number-wrapper flex-column center gap-1">
                <div className="two-digit with-divider centered">{minutes}</div>
                <span className="number-text">Минут</span>
            </div>
            <div className="number-wrapper flex-column center gap-1">
                <div className="two-digit centered">{seconds}</div>
                <span className="number-text">Секунд</span>
            </div>
        </div>
    )
}
