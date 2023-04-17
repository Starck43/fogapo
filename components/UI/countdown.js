import { useTimeCounter } from "../../core/hooks"

export default function Countdown({ datetime }) {
    //useEffect( () => {},[datetime])
    let countdown = useTimeCounter(datetime)

    if (!countdown) {
        return null
    }

    let { days, hours, minutes, seconds } = countdown

    return (
        <div className="countdown-block flex-wrap center">
            <h4 className="countdown-title col-12">До мероприятия осталось:</h4>
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
