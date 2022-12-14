import {memo} from "react"
import {HtmlContent} from "../UI/html-content"


function Contacts({info, location, isActive, ...props}) {
	if (!isActive || !location && !info) return

	return (
		<div {...props}>
			{info &&
			<HtmlContent className="get-in-touch frame shadow4">
				{info}
			</HtmlContent>
			}

			{location &&
			<HtmlContent className="location large-text">
				{location}
			</HtmlContent>
			}
		</div>
	)
}

export default  memo(Contacts)
