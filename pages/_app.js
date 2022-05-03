import {IconContext} from 'react-icons'
import '../styles/main.sass'

export default function MyApp({Component, pageProps}) {
	return (
		<IconContext.Provider value={{className: 'react-icons'}}>
			<Component {...pageProps} />
		</IconContext.Provider>
	)
}
