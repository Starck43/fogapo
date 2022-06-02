import Icon from "./Icon"
import parse, {domToReact} from "html-react-parser"


const parseOptions = {

  replace: ({ attribs, children }) => {
		if (!attribs) {
			return;
		}

		if (attribs.tag === 'img') {
			console.log(attribs)
			return <Icon src={attribs.src} width="50" height="50"/>
		}
	}

}


export const HtmlContent = ({children, className}) => (
	<div className={className} dangerouslySetInnerHTML={{__html: children}}/>
)

export const HtmlBodyContent = ({children, className}) => (
	<div className={className}>{parse(children, parseOptions)}</div>
)
