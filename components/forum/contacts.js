import {HtmlContent} from "../UI/html-content"


export default function Contacts({info, location, ...props}) {
	if (!location && !info) return

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
