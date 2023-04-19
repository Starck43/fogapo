import { memo } from "react"
import { HtmlContent } from "../UI/html-content"
import Title from "../UI/title"
import { isActiveDate } from "../../core/utils"

function Contacts({ info, location, date_forum, className }) {
    const isActive = isActiveDate(date_forum)

    if (!isActive || (!location && !info)) return

    return (
        <div className={className}>
            {info && <HtmlContent className="get-in-touch frame shadow4">{info}</HtmlContent>}

            {location && (
                <div className="location flex-column end gap">
                    <Title title="Место проведения:" />
                    <HtmlContent className="location-content">{location}</HtmlContent>
                </div>
            )}
        </div>
    )
}

export default memo(Contacts)
