import {Fragment} from 'react'
import Meta from './meta'
import Copyright from "./copyright"


export default function Layout({preview, children}) {
	return (
		<Fragment>
			<Meta/>
			{children}
			<Copyright src="mailto:webmaster@istarck.ru"/>
		</Fragment>
	)
}
