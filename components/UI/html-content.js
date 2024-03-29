
import parse, {domToReact} from "html-react-parser"

/*
const parseOptions = {
  replace: ({ attribs, children }) => {
		if (!attribs) {
			return;
		}

		if (attribs.tag === 'img') {
			return <Icon src={attribs.src} width="50" height="50"/>
		}
	}
}
*/

export const HtmlContent = ({as:Tag = "div", children, className}) => (
	<Tag className={className} dangerouslySetInnerHTML={{__html: children}}/>
)

export const ParsedContent = ({children, className}) => (
	<div className={className}>{parse(children)}</div>
)
