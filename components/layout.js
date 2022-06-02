import {Fragment} from 'react'
import Copyright from "./copyright"
import Meta from "./meta"


export default function Layout({preview, children}) {
	return (
		<Fragment>
			<Meta />
			{children}
			<Copyright src="mailto:webmaster@istarck.ru"/>
		</Fragment>
	)
}
