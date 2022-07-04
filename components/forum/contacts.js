import {Fragment} from "react"
import {HtmlContent} from "../UI/html-content"
//import * as PropTypes from "prop-types"


export default function Contacts({info, location}) {
	return (
		<Fragment>
			{info && <HtmlContent className="get-in-touch shadow4">{info}</HtmlContent>}
			{location && <HtmlContent className="location large-text">{location}</HtmlContent>}
		</Fragment>
	)
}
/*

Contacts.propTypes = {
	className: PropTypes.string,
	phone: PropTypes.string,
	location: PropTypes.string,
}*/
