import {IconContext} from 'react-icons'
import '../styles/vendors.scss'
import '../styles/main.sass'
//import 'bootstrap/dist/css/bootstrap.css'


export default function MyApp({Component, pageProps}) {
	return (
		<IconContext.Provider value={{className: 'react-icons'}}>
			<Component {...pageProps} />
		</IconContext.Provider>
	)
}
