import {Fragment} from "react"
import {HtmlContent} from "../UI/html-content"
//import * as PropTypes from "prop-types"


export default function Contacts({info, location}) {
	return (
		<Fragment>
			<HtmlContent className="get-in-touch shadow4">{info}</HtmlContent>
			<HtmlContent className="location">{location}</HtmlContent>
		</Fragment>
	)
}
/*

Contacts.propTypes = {
	className: PropTypes.string,
	phone: PropTypes.string,
	location: PropTypes.string,
}*/
